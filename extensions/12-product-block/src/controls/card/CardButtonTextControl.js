import {ButtonTextBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_TEXT_CONTROL_ID = 'product-block-card-button-text-control';

export class CardButtonTextControl extends ButtonTextBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_TEXT_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Text')
        }
    }
}
