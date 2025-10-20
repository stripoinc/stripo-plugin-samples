import {UIElementTagRegistry, UIElementType} from '@stripoinc/ui-editor-extensions';
import {EXTERNAL_MERGE_TAGS_UI_ELEMENT_ID} from './MergeTagsUiElement';

export class ExtensionTagRegistry extends UIElementTagRegistry {
    /**
     * Registers custom UI elements to replace default editor elements
     * @param {Object} uiElementsTagsMap - Map of UI element types to custom element IDs
     */
    registerUiElements(uiElementsTagsMap: Record<string, string>): void {
        uiElementsTagsMap[UIElementType.MERGETAGS] = EXTERNAL_MERGE_TAGS_UI_ELEMENT_ID;
    }
}
