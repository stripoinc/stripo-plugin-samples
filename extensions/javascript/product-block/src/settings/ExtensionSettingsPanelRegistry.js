import {SettingsPanelRegistry, SettingsPanelTab, SettingsTab} from '@stripoinc/ui-editor-extensions';
import {CONTROL_ID_NUMBER_OF_CARDS} from './controls/settings/NumberOfCardsControl';
import {CONTROL_ID_CARDS_PER_ROW} from './controls/settings/CardsPerRowControl';
import {CONTROL_ID_ORIENTATION} from './controls/settings/CardOrientationControl';
import {CONTROL_ID_CARD_COMPOSITION} from './controls/card/CardCompositionControl';
import {CONTROL_ID_ROW_PADDING} from './controls/settings/RowPaddingControl';
import {CONTROL_ID_ROW_BACKGROUND_COLOR} from './controls/settings/RowBackgroundColorControl';

export class ExtensionSettingsPanelRegistry extends SettingsPanelRegistry {

    registerBlockControls(controls) {
        controls['product-block'] = [
            new SettingsPanelTab(
                SettingsTab.SETTINGS,
                [
                    CONTROL_ID_NUMBER_OF_CARDS,
                    CONTROL_ID_CARDS_PER_ROW,
                    CONTROL_ID_ORIENTATION,
                    CONTROL_ID_ROW_BACKGROUND_COLOR,
                    CONTROL_ID_ROW_PADDING
                ]
            ),
            new SettingsPanelTab(
                'Card',
                [
                    CONTROL_ID_CARD_COMPOSITION,
                ]
            ).withLabel('Card')
        ]
    }
}
