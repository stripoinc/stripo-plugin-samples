import {
    ADD_CUSTOM_FONT_OPTION,
    ExtensionBuilder,
    UEAttr,
    UIElement,
    UIElementTagRegistry,
    UIElementType,
} from '@stripoinc/ui-editor-extensions';

const ID = 'custom-font-family-select';
const ORIGINAL_ID = 'original-font-family-select';

class TagRegistry extends UIElementTagRegistry {
    registerUiElements(uiElementsTagsMap) {
        uiElementsTagsMap[ORIGINAL_ID] = uiElementsTagsMap[UIElementType.FONT_FAMILY_SELECT];
        uiElementsTagsMap[UIElementType.FONT_FAMILY_SELECT] = ID;
    }
}

class CustomFontFamilySelect extends UIElement {
    getId() {
        return ID;
    }

    onRender(container) {
        this.listener = this._onChange.bind(this);
        this.originalSelect = container.querySelector('#originalSelect');
        this.originalSelect.addEventListener('change', this.listener);
    }

    onAttributeUpdated(name, value) {
        this.originalSelect.setUIEAttribute(name, value);
        super.onAttributeUpdated(name, value);
    }

    onDestroy() {
        this.originalSelect.removeEventListener('change', this.listener);
    }

    _getDialogTemplate() {
        return `<div style="display: flex;
    flex-direction: column;
    width: 320px;
    border: 1px solid gray;
    padding: 10px;
    gap: 10px;
    background: lightgray;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);">
              Name:
              <input id="name">
              CSS declaration:
              <input id="fontFamily">
              URL:
              <input id="url">
              <button id="confirm">OK</button>
            </div>`;
    }

    _showDialog() {
        this.dialog = document.createElement('div');
        this.dialog.innerHTML = this._getDialogTemplate();
        this.api.ignoreClickOutside(true);
        document.body.appendChild(this.dialog);
        this.dialog.querySelector('#confirm').addEventListener('click', () => this._submitDialog());
    }

    _submitDialog() {
        const newFont = {
            name: this.dialog.querySelector('#name').value,
            fontFamily: this.dialog.querySelector('#fontFamily').value,
            url: this.dialog.querySelector('#url').value,
        }
        this.api.addCustomFont(newFont);
        this.dialog.remove();
        this.dialog = undefined;
        this.api.ignoreClickOutside(false);
    }

    _onChange(event) {
        if (event.target.value !== ADD_CUSTOM_FONT_OPTION) {
            this.api.onValueChanged(event.target.value);
        } else if (!this.dialog) {
            this._showDialog();
        }
    }

    getValue() {
        return this.originalSelect.value;
    }

    setValue(value) {
        this.originalSelect.value = value;
    }

    getTemplate() {
        const attrs = UEAttr.FONT_FAMILY_SELECT;
        return `<${ORIGINAL_ID} id="originalSelect" style="width: 100%;" ${attrs.addCustomFontOption}="+ Insert custom font"></${ORIGINAL_ID}>`;
    }
}

export default new ExtensionBuilder()
    .addUiElement(CustomFontFamilySelect)
    .withUiElementTagRegistry(TagRegistry)
    .build();
