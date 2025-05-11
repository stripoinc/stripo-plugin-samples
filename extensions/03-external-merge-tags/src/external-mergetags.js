import {UIElementType, UIElement, UIElementTagRegistry} from '@stripoinc/ui-editor-extensions';
import {ExternalMergeTagsLibrary} from './mergetags-library';

const ID = 'external-merge-tags-ui-element';

export class MergeTagsTagRegistry extends UIElementTagRegistry {
    registerUiElements(uiElementsTagsMap) {
        uiElementsTagsMap[UIElementType.MERGETAGS] = ID;
    }
}

export class MergeTagsUiElementExtension extends UIElement {
    getId() {
        return ID;
    }

    onRender(container) {
        this.listener = this._onClick.bind(this);

        this.mergeTagsButton = container.querySelector('#mergeTagsButton');
        this.mergeTagsButton.addEventListener('click', this.listener);
    }

    onDestroy() {
        this.mergeTagsButton.removeEventListener('click', this.listener);
    }

    _onClick(event) {
        if (!this.mergeTagsLibrary) {
            this.mergeTagsLibrary = new ExternalMergeTagsLibrary();
        }
        this.mergeTagsLibrary.openMergeTagsLibrary(this.selectedMergeTag?.value, (data) => {
            this.api.onValueChanged(data);
        });
    }

    onAttributeUpdated(name, value) {
        if (name === 'mergeTag') {
            this.selectedMergeTag = value;
        }
    }

    getTemplate() {
        return `
            <div>
              <UE-BUTTON id="mergeTagsButton" class="btn btn-primary">${this.api.translate('Open merge tags')}</UE-BUTTON>
            </div>`;
    }
}
