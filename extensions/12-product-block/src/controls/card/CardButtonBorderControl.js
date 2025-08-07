import {ButtonBorderBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_BORDER_CONTROL_ID = 'product-block-card-button-border-control';

export class CardButtonBorderControl extends ButtonBorderBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_BORDER_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Border'),
            titleHint: this.api.translate('Product Button Border Hint'),
            borderColorTitle: this.api.translate('Product Button Border Color'),
            borderStyleTitle: this.api.translate('Product Button Border Style'),
            borderStyleHint: this.api.translate('Product Button Border Style Hint'),
        }
    }
}
