import {TextPaddingsBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_NAME_PADDINGS_CONTROL_ID = 'product-block-card-name-paddings-control';

export class CardNamePaddingsControl extends TextPaddingsBuiltInControl {
    getId() {
        return PRODUCT_CARD_NAME_PADDINGS_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Name Paddings')
        }
    }
}
