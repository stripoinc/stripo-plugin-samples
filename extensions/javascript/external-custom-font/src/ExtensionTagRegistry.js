import {UIElementTagRegistry, UIElementType} from '@stripoinc/ui-editor-extensions';
import {CUSTOM_FONT_FAMILY_SELECT_UI_ELEMENT_ID, ORIGINAL_FONT_FAMILY_SELECT_ID} from './CustomFontFamilySelectUIElement';

export class ExtensionTagRegistry extends UIElementTagRegistry {
    registerUiElements(uiElementsTagsMap) {
        uiElementsTagsMap[ORIGINAL_FONT_FAMILY_SELECT_ID] = uiElementsTagsMap[UIElementType.FONT_FAMILY_SELECT];
        uiElementsTagsMap[UIElementType.FONT_FAMILY_SELECT] = CUSTOM_FONT_FAMILY_SELECT_UI_ELEMENT_ID;
    }
}
