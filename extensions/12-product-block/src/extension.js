import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import en from './i18n/en';
import {ProductBlock} from './blocks/ProductBlock';

export default new ExtensionBuilder()
    .withLocalization({
        'en': en
    })
    .addBlock(ProductBlock)
    .build();
