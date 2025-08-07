import {TextStyleBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_NAME_TEXT_STYLE_CONTROL_ID = 'product-block-card-name-text-style-control';

export class CardNameTextStyleControl extends TextStyleBuiltInControl {
    getId() {
        return PRODUCT_CARD_NAME_TEXT_STYLE_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Name Text Style')
        }
    }
}
