import {TextColorBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_NAME_TEXT_COLOR_CONTROL_ID = 'product-block-card-name-text-color-control';

export class CardNameTextColorControl extends TextColorBuiltInControl {
    getId() {
        return PRODUCT_CARD_NAME_TEXT_COLOR_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Name Font Color')
        }
    }
}
