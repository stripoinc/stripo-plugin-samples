import {ButtonMarginsBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_MARGINS_CONTROL_ID = 'product-block-card-button-margins-control';

export class CardButtonMarginsControl extends ButtonMarginsBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_MARGINS_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Margins')
        }
    }
}
