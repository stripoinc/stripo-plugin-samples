import {TextAlignBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_NAME_ALIGN_CONTROL_ID = 'product-block-card-name-align-control';

export class CardNameAlignControl extends TextAlignBuiltInControl {
    getId() {
        return PRODUCT_CARD_NAME_ALIGN_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text.name');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Name Align')
        }
    }
}
