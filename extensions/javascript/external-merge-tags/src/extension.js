import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import {MergeTagsUiElement} from './MergeTagsUiElement';
import {ExtensionTagRegistry} from './ExtensionTagRegistry';
import {MyMergeTagsLibrary} from './MyMergeTagsLibrary';

const extension = new ExtensionBuilder()
    // Text block: replace the merge tags control with the custom UI element
    .addUiElement(MergeTagsUiElement)
    .withUiElementTagRegistry(ExtensionTagRegistry)
    // Input fields: open the same modal from the merge tag icons
    .withExternalMergeTagsLibrary(MyMergeTagsLibrary)
    .build();

export default extension;
