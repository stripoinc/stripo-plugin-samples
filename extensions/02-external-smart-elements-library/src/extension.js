import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {ExternalSmartElementsLibraryExample} from './external-smart-elements-library';

export default new ExtensionBuilder()
  .withExternalSmartElementsLibrary(ExternalSmartElementsLibraryExample)
  .build();
