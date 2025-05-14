import {ModificationDescription, Control, UIElementType, UEAttr} from '@stripoinc/ui-editor-extensions';

const COLOR_ELEMENT_NAME = 'simpleBlockBackgroundColor';

export const CONTROL_SIMPLE_BLOCK_BACKGROUND_COLOR_ID = 'simple-block-background-color-control';

export class SimpleBlockBackgroundColorControl extends Control {
    /**
     * Returns a unique identifier for the control.
     * This ID must be unique within the editor.
     * @returns {string} The unique ID for this control.
     */
    getId() {
        return CONTROL_SIMPLE_BLOCK_BACKGROUND_COLOR_ID;
    }

    /**
     * Returns an HTML string template that defines the structure of the control.
     * This template uses built-in UI elements like ue-label and a custom element 'brand-color-picker'.
     * @returns {string} The HTML template for the control.
     */
    getTemplate() {
        return `
            <div>
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Background color')}:"></${UIElementType.LABEL}>
                <brand-color-picker name="${COLOR_ELEMENT_NAME}"></brand-color-picker>
            </div>`;
    }

    /**
     * Called after the control is rendered in the settings panel.
     * Sets up an event listener to react to changes in the 'brand-color-picker' value.
     * When the color changes, it modifies the 'bgcolor' attribute of the associated template node.
     */
    onRender() {
        this.api.onValueChanged(COLOR_ELEMENT_NAME, (newValue, oldValue) => {
                this.api.getDocumentModifier()
                    .modifyHtml(this.node)
                        .setAttribute('bgcolor', newValue)
                    .apply(new ModificationDescription('Set background color to {color}').withParams({color: newValue}));
        });

    }

    /**
     * Called when the associated template node (e.g., the block being edited) is updated.
     * Extracts the current 'bgcolor' attribute from the node and updates the control's UI element value.
     * @param {ImmutableHtmlNode} node The immutable HTML node representing the element being controlled.
     */
    onTemplateNodeUpdated(node) {
        this.node = node;
        this.api.updateValues({
            [COLOR_ELEMENT_NAME]: node.getAttribute('bgcolor'),
        });
    }
}
