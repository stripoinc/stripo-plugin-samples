import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import {MyExternalSmartElementsLibrary} from './MyExternalSmartElementsLibrary';

const extension = new ExtensionBuilder()
    .withExternalSmartElementsLibrary(MyExternalSmartElementsLibrary)
    .build();

export default extension;
