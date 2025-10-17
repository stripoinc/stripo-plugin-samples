import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import {CustomFontFamilySelectUIElement} from './CustomFontFamilySelectUIElement';
import {ExtensionTagRegistry} from './ExtensionTagRegistry';

const extension = new ExtensionBuilder()
    .addUiElement(CustomFontFamilySelectUIElement)
    .withUiElementTagRegistry(ExtensionTagRegistry)
    .build();

export default extension;
