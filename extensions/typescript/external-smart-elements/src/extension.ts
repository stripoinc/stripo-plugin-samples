import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import MyExternalSmartElementsLibrary from './MyExternalSmartElementsLibrary.ts';

const extension = new ExtensionBuilder()
    .withExternalSmartElementsLibrary(MyExternalSmartElementsLibrary)
    .build();

export default extension;
