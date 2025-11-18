import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import MyExternalImageLibraryTab from './MyExternalImageLibraryTab.js';

const extension = new ExtensionBuilder()
    .withExternalImageLibraryTab(MyExternalImageLibraryTab)
    .withLocalization({
        'en': {
            'Custom Images': 'Custom Images',
        },
        'uk': {
            'Custom Images': 'Власні зображення',
        },
    })
    .build();

export default extension;
