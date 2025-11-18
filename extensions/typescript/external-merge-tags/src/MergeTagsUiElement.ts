import {UIElement, UIElementType, UIElementApi} from '@stripoinc/ui-editor-extensions';
import {MyExternalMergeTagsLibrary} from './MyExternalMergeTagsLibrary';

export const EXTERNAL_MERGE_TAGS_UI_ELEMENT_ID = 'external-merge-tags-ui-element';

interface MergeTagData {
    value: string;
    label: string;
}

export class MergeTagsUiElement extends UIElement {
    private listener?: (event: Event) => void;
    private mergeTagsButton?: HTMLElement;
    private mergeTagsLibrary?: MyExternalMergeTagsLibrary;
    private selectedMergeTag?: MergeTagData;
    private isModuleNode: boolean = false;

    /**
     * Returns the unique identifier for this UI element
     */
    getId(): string {
        return EXTERNAL_MERGE_TAGS_UI_ELEMENT_ID;
    }

    /**
     * Returns the HTML template for the merge tags button
     */
    getTemplate(): string {
        return `
            <div>
              <${UIElementType.BUTTON} id="mergeTagsButton" class="btn btn-primary">Open merge tags</${UIElementType.BUTTON}>
            </div>`;
    }

    /**
     * Called when the element is rendered in the editor
     * @param {HTMLElement} container - The container element
     */
    onRender(container: HTMLElement): void {
        this.listener = this._onClick.bind(this);

        this.mergeTagsButton = container.querySelector('#mergeTagsButton') as HTMLElement;
        this.mergeTagsButton.addEventListener('click', this.listener);
    }

    /**
     * Called when the element is destroyed
     */
    onDestroy(): void {
        if (this.mergeTagsButton && this.listener) {
            this.mergeTagsButton.removeEventListener('click', this.listener);
        }
    }

    /**
     * Handles button click events
     */
    private _onClick(event: Event): void {
        this.openMergeTagLibrary();
    }

    /**
     * Opens the external merge tags library modal
     */
    openMergeTagLibrary(): void {
        if (!this.mergeTagsLibrary) {
            this.mergeTagsLibrary = new MyExternalMergeTagsLibrary();
        }
        this.mergeTagsLibrary.openMergeTagsLibrary(this.selectedMergeTag?.value, this.isModuleNode, (data: MergeTagData) => {
            this.api.triggerValueChange(data);
        });
    }

    /**
     * Called when an attribute is updated
     * @param {string} name - Attribute name
     * @param {any} value - New attribute value
     */
    onAttributeUpdated(name: string, value: any): void {
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
