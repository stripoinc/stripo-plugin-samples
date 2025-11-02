import {UIElement, UIElementType} from '@stripoinc/ui-editor-extensions';
import {MyExternalMergeTagsLibrary} from './MyExternalMergeTagsLibrary';

export const EXTERNAL_MERGE_TAGS_UI_ELEMENT_ID = 'external-merge-tags-ui-element';

export class MergeTagsUiElement extends UIElement {
    isModuleNode = false;
    /**
     * Returns the unique identifier for this UI element
     */
    getId() {
        return EXTERNAL_MERGE_TAGS_UI_ELEMENT_ID;
    }

    /**
     * Returns the HTML template for the merge tags button
     */
    getTemplate() {
        return `
            <div>
              <${UIElementType.BUTTON} id="mergeTagsButton" class="btn btn-primary">Open merge tags</${UIElementType.BUTTON}>
            </div>`;
    }

    /**
     * Called when the element is rendered in the editor
     * @param {HTMLElement} container - The container element
     */
    onRender(container) {
        this.listener = this._onClick.bind(this);

        this.mergeTagsButton = container.querySelector('#mergeTagsButton');
        this.mergeTagsButton.addEventListener('click', this.listener);
    }

    /**
     * Called when the element is destroyed
     */
    onDestroy() {
        this.mergeTagsButton.removeEventListener('click', this.listener);
    }

    /**
     * Handles button click events
     */
    _onClick(event) {
        this.openMergeTagLibrary();
    }

    /**
     * Opens the external merge tags library modal
     */
    openMergeTagLibrary() {
        if (!this.mergeTagsLibrary) {
            this.mergeTagsLibrary = new MyExternalMergeTagsLibrary();
        }
        this.mergeTagsLibrary.openMergeTagsLibrary(this.selectedMergeTag?.value, this.isModuleNode, (data) => {
            this.api.triggerValueChange(data);
        });
    }

    /**
     * Called when an attribute is updated
     * @param {string} name - Attribute name
     * @param {any} value - New attribute value
     */
    onAttributeUpdated(name, value) {
        if (name === 'blockNode') {
            this.isModuleNode = !!value.getClosestModuleId();
        }
        if (name === 'mergeTag') {
            this.selectedMergeTag = value;
            // If a merge tag is selected, open the library immediately
            this.selectedMergeTag && this.openMergeTagLibrary();
        }
    }
}
