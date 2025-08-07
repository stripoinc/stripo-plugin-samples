import {TextAlignBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_PRICE_ALIGN_CONTROL_ID = 'product-block-card-price-align-control';

export class CardPriceAlignControl extends TextAlignBuiltInControl {
    getId() {
        return PRODUCT_CARD_PRICE_ALIGN_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text.price');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Price Align')
        }
    }
}
