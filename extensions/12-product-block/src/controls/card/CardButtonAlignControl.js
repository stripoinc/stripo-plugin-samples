import {ButtonAlignBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_ALIGN_CONTROL_ID = 'product-block-card-button-align-control';

export class CardButtonAlignControl extends ButtonAlignBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_ALIGN_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Alignment')
        }
    }
}
