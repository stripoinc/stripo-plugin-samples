import {TextLineSpacingBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_NAME_LINE_SPACING_CONTROL_ID = 'product-block-card-name-line-spacing-control';

export class CardNameLineSpacingControl extends TextLineSpacingBuiltInControl {
    getId() {
        return PRODUCT_CARD_NAME_LINE_SPACING_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Name Line Height')
        }
    }
}
