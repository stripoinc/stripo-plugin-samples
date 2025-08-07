import {SettingsPanelRegistry, SettingsPanelTab, SettingsTab} from '@stripoinc/ui-editor-extensions';
import {CONTROL_PRODUCT_BLOCK_SELECT_PRODUCT_ITEMS_ID} from '../controls/settings/SelectProductItemsControl';
import {PRODUCT_BLOCK_ID} from './ProductBlock';
import {CARD_BACKGROUND_COLOR_CONTROL_ID} from '../controls/card/CardBackgroundColorControl';
import {CONTROL_PRODUCT_BLOCK_CARD_ORIENTATION_ID} from '../controls/settings/CardOrientationControl';
import {CARDS_PER_ROW_CONTROL_ID} from '../controls/settings/CardsPerRowControl';
import {BLOCK_ADAPT_CONTROL_ID} from '../controls/settings/BlockAdaptControl';
import {BLOCK_ROW_PADDINGS_CONTROL_ID} from '../controls/settings/BlockRowPaddingsControl';
import {PRODUCT_CARD_NAME_TEXT_COLOR_CONTROL_ID} from '../controls/card/CardNameTextColorControl';
import {PRODUCT_CARD_NAME_ALIGN_CONTROL_ID} from '../controls/card/CardNameAlignControl';
import {PRODUCT_CARD_NAME_FONT_FAMILY_CONTROL_ID} from '../controls/card/CardNameFontFamilyControl';
import {PRODUCT_CARD_NAME_FONT_SIZE_CONTROL_ID} from '../controls/card/CardNameFontSizeControl';
import {PRODUCT_CARD_NAME_TEXT_STYLE_CONTROL_ID} from '../controls/card/CardNameTextStyleControl';
import {PRODUCT_CARD_NAME_LINE_SPACING_CONTROL_ID} from '../controls/card/CardNameLineSpacingControl';
import {PRODUCT_CARD_NAME_PADDINGS_CONTROL_ID} from '../controls/card/CardNamePaddingsControl';
import {PRODUCT_CARD_BUTTON_TEXT_CONTROL_ID} from '../controls/card/CardButtonTextControl';
import {PRODUCT_CARD_BUTTON_COLOR_CONTROL_ID} from '../controls/card/CardButtonColorControl';
import {PRODUCT_CARD_BUTTON_TEXT_COLOR_CONTROL_ID} from '../controls/card/CardButtonTextColorControl';
import {PRODUCT_CARD_BUTTON_BORDER_RADIUS_CONTROL_ID} from '../controls/card/CardButtonBorderRadiusControl';
import {PRODUCT_CARD_BUTTON_ALIGN_CONTROL_ID} from '../controls/card/CardButtonAlignControl';
import {PRODUCT_CARD_BUTTON_FIT_TO_CONTAINER_CONTROL_ID} from '../controls/card/CardButtonFitContainerControl';
import {PRODUCT_CARD_BUTTON_BORDER_CONTROL_ID} from '../controls/card/CardButtonBorderControl';
import {PRODUCT_CARD_BUTTON_MARGINS_CONTROL_ID} from '../controls/card/CardButtonMarginsControl';
import {PRODUCT_CARD_BUTTON_PADDINGS_CONTROL_ID} from '../controls/card/CardButtonPaddingsControl';
import {PRODUCT_CARD_PRICE_ALIGN_CONTROL_ID} from '../controls/card/CardPriceAlignControl';

export class ExtensionSettingsPanelRegistry extends SettingsPanelRegistry {

    registerBlockControls(controls) {
        controls[PRODUCT_BLOCK_ID] = [
            new SettingsPanelTab(
                SettingsTab.SETTINGS,
                [
                    CONTROL_PRODUCT_BLOCK_SELECT_PRODUCT_ITEMS_ID,
                    CONTROL_PRODUCT_BLOCK_CARD_ORIENTATION_ID,
                    CARDS_PER_ROW_CONTROL_ID,
                    BLOCK_ADAPT_CONTROL_ID
                ]),
            new SettingsPanelTab(
                "row",
                [
                    BLOCK_ROW_PADDINGS_CONTROL_ID
                ]).withLabel(this.api.translate('Row')),
            new SettingsPanelTab(
                'card',
                [
                    // CARD_BACKGROUND_COLOR_CONTROL_ID,
                    // PRODUCT_CARD_NAME_TEXT_COLOR_CONTROL_ID,
                    PRODUCT_CARD_NAME_ALIGN_CONTROL_ID,
                    // PRODUCT_CARD_NAME_FONT_FAMILY_CONTROL_ID,
                    // PRODUCT_CARD_NAME_FONT_SIZE_CONTROL_ID,
                    // PRODUCT_CARD_NAME_TEXT_STYLE_CONTROL_ID,
                    // PRODUCT_CARD_NAME_LINE_SPACING_CONTROL_ID,
                    // PRODUCT_CARD_NAME_PADDINGS_CONTROL_ID,
                    PRODUCT_CARD_PRICE_ALIGN_CONTROL_ID
                    // PRODUCT_CARD_BUTTON_TEXT_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_COLOR_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_TEXT_COLOR_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_BORDER_RADIUS_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_ALIGN_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_FIT_TO_CONTAINER_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_BORDER_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_MARGINS_CONTROL_ID,
                    // PRODUCT_CARD_BUTTON_PADDINGS_CONTROL_ID
                ]).withLabel(this.api.translate('Card'))
        ];
    }
}
