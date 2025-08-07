import {TextSizeBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_NAME_FONT_SIZE_CONTROL_ID = 'product-block-card-name-font-size-control';

export class CardNameFontSizeControl extends TextSizeBuiltInControl {
    getId() {
        return PRODUCT_CARD_NAME_FONT_SIZE_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Name Font Size')
        }
    }
}
