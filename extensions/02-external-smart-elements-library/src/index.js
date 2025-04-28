import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {initPlugin} from './StripoLoader';
import {ExternalSmartElementsLibraryExample} from "./external-smart-elements-library";

const extension = new ExtensionBuilder()
  .withExternalSmartElementsLibrary(ExternalSmartElementsLibraryExample)
  .build();

initPlugin(extension);
