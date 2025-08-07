import {ButtonBorderRadiusBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_BORDER_RADIUS_CONTROL_ID = 'product-block-card-button-border-radius-control';

export class CardButtonBorderRadiusControl extends ButtonBorderRadiusBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_BORDER_RADIUS_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Border Radius')
        }
    }
}
