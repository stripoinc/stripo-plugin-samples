import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import MyExternalVideoLibrary from './MyExternalVideoLibrary';

const extension = new ExtensionBuilder()
    .withExternalVideosLibrary(MyExternalVideoLibrary)
    .build();

export default extension;
