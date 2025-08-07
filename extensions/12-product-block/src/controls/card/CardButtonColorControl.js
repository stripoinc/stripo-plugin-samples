import {ButtonColorBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_COLOR_CONTROL_ID = 'product-block-card-button-color-control';

export class CardButtonColorControl extends ButtonColorBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_COLOR_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Color')
        }
    }
}
