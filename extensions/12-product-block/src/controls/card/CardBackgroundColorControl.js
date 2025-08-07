import {ContainerBackgroundColorBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const CARD_BACKGROUND_COLOR_CONTROL_ID = 'product-block-card-background-color-control';

export class CardBackgroundColorControl extends ContainerBackgroundColorBuiltInControl {
    getId() {
        return CARD_BACKGROUND_COLOR_CONTROL_ID;
    }
}
