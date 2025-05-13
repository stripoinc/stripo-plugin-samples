import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import ExternalImagesLibraryExample from './external-images-library';

export default new ExtensionBuilder()
    .withExternalImageLibrary(ExternalImagesLibraryExample)
    .build();
