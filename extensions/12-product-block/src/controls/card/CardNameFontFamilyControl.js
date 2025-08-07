import {FontFamilyBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_NAME_FONT_FAMILY_CONTROL_ID = 'product-block-card-name-font-family-control';

export class CardNameFontFamilyControl extends FontFamilyBuiltInControl {
    getId() {
        return PRODUCT_CARD_NAME_FONT_FAMILY_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-text');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Name Font Family')
        }
    }
}
