import {ButtonFitToContainerBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_CARD_BUTTON_FIT_TO_CONTAINER_CONTROL_ID = 'product-block-card-button-fit-to-container-control';

export class CardButtonFitContainerControl extends ButtonFitToContainerBuiltInControl {
    getId() {
        return PRODUCT_CARD_BUTTON_FIT_TO_CONTAINER_CONTROL_ID;
    }

    getTargetNodes(root) {
        return root.querySelectorAll('.esd-block-button');
    }

    getLabels() {
        return {
            title: this.api.translate('Product Button Fit to Container')
        }
    }
}
