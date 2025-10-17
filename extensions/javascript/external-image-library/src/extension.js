import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import MyExternalImagesLibrary from './MyExternalImagesLibrary';

const extension = new ExtensionBuilder()
    .withExternalImageLibrary(MyExternalImagesLibrary)
    .build();

export default extension;
