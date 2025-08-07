import {ButtonPaddingsBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_PADDINGS_CONTROL_ID = 'product-block-card-button-paddings-control';

export class CardButtonPaddingsControl extends ButtonPaddingsBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_PADDINGS_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Paddings')
        }
    }
}
