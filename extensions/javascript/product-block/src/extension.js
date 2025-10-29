import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {ExtensionIconsRegistry} from './icons/ExtensionIconsRegistry';
import en from './i18n/en';
import editorStyles from './styles/editor.css?raw';
import previewStyles from './styles/preview.css?raw';
import {ExtensionSettingsPanelRegistry} from './settings/ExtensionSettingsPanelRegistry';
import {ProductBlock} from './block/ProductBlock';
import {NumberOfCardsControl} from './settings/controls/settings/NumberOfCardsControl';
import {CardsPerRowControl} from './settings/controls/settings/CardsPerRowControl';
import {CardOrientationControl} from './settings/controls/settings/CardOrientationControl';
import {CardCompositionControl} from './settings/controls/card/CardCompositionControl';
import ControlUtils from './settings/controls/ControlUtils';
import {RowPaddingControl} from './settings/controls/settings/RowPaddingControl';
import {RowBackgroundColorControl} from './settings/controls/settings/RowBackgroundColorControl';

const extensionBuilder = new ExtensionBuilder();
ControlUtils.registerControls(extensionBuilder);

const extension = extensionBuilder
    .withIconsRegistry(ExtensionIconsRegistry)
    .withLocalization({
        'en': en,
    })
    .addStyles(editorStyles)
    .withPreviewStyles(previewStyles)
    .withSettingsPanelRegistry(ExtensionSettingsPanelRegistry)
    .addBlock(ProductBlock)
    .addControl(NumberOfCardsControl)
    .addControl(CardsPerRowControl)
    .addControl(CardOrientationControl)
    .addControl(RowBackgroundColorControl)
    .addControl(RowPaddingControl)
    .addControl(CardCompositionControl)
    .build();

export default extension;
