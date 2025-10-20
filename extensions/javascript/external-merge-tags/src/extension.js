import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import {MergeTagsUiElement} from './MergeTagsUiElement';
import {ExtensionTagRegistry} from './ExtensionTagRegistry';

const extension = new ExtensionBuilder()
    .addUiElement(MergeTagsUiElement)
    .withUiElementTagRegistry(ExtensionTagRegistry)
    .build();

export default extension;
