import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import previewStyles from './styles/preview.css?raw';
import en from './i18n/en';
import {ProductBlock} from './blocks/ProductBlock';
import {SelectProductItemsControl} from './controls/settings/SelectProductItemsControl';
import {ExtensionSettingsPanelRegistry} from './blocks/ExtensionSettingsPanelRegistry';
import {CardBackgroundColorControl} from './controls/card/CardBackgroundColorControl';
import {CardOrientationControl} from './controls/settings/CardOrientationControl';
import {CardsPerRowControl} from './controls/settings/CardsPerRowControl';
import {BlockAdaptControl} from './controls/settings/BlockAdaptControl';
import {BlockRowPaddingsControl} from './controls/settings/BlockRowPaddingsControl';
import {CardNameTextColorControl} from './controls/card/CardNameTextColorControl';
import {CardNameAlignControl} from './controls/card/CardNameAlignControl';
import {CardNameFontFamilyControl} from './controls/card/CardNameFontFamilyControl';
import {CardNameFontSizeControl} from './controls/card/CardNameFontSizeControl';
import {CardNameTextStyleControl} from './controls/card/CardNameTextStyleControl';
import {CardNameLineSpacingControl} from './controls/card/CardNameLineSpacingControl';
import {CardNamePaddingsControl} from './controls/card/CardNamePaddingsControl';
import {CardButtonTextControl} from './controls/card/CardButtonTextControl';
import {CardButtonColorControl} from './controls/card/CardButtonColorControl';
import {CardButtonTextColorControl} from './controls/card/CardButtonTextColorControl';
import {CardButtonBorderRadiusControl} from './controls/card/CardButtonBorderRadiusControl';
import {CardButtonAlignControl} from './controls/card/CardButtonAlignControl';
import {CardButtonFitContainerControl} from './controls/card/CardButtonFitContainerControl';
import {CardButtonBorderControl} from './controls/card/CardButtonBorderControl';
import {CardButtonMarginsControl} from './controls/card/CardButtonMarginsControl';
import {CardButtonPaddingsControl} from './controls/card/CardButtonPaddingsControl';
import {CardPriceAlignControl} from './controls/card/CardPriceAlignControl';

export default new ExtensionBuilder()
    .withLocalization({
        'en': en
    })
    .withPreviewStyles(previewStyles)
    .addBlock(ProductBlock)
    .addControl(SelectProductItemsControl)
    .addControl(CardOrientationControl)
    .addControl(CardsPerRowControl)
    .addControl(BlockAdaptControl)
    .addControl(BlockRowPaddingsControl)
    .addControl(CardBackgroundColorControl)
    .addControl(CardNameTextColorControl)
    .addControl(CardNameAlignControl)
    .addControl(CardNameFontFamilyControl)
    .addControl(CardNameFontSizeControl)
    .addControl(CardNameTextStyleControl)
    .addControl(CardNameLineSpacingControl)
    .addControl(CardNamePaddingsControl)
    .addControl(CardPriceAlignControl)
    .addControl(CardButtonTextControl)
    .addControl(CardButtonColorControl)
    .addControl(CardButtonTextColorControl)
    .addControl(CardButtonBorderRadiusControl)
    .addControl(CardButtonAlignControl)
    .addControl(CardButtonFitContainerControl)
    .addControl(CardButtonBorderControl)
    .addControl(CardButtonMarginsControl)
    .addControl(CardButtonPaddingsControl)
    .withSettingsPanelRegistry(ExtensionSettingsPanelRegistry)
    .build();
