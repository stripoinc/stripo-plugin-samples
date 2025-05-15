import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {SimpleBlock} from './blocks/SimpleBlock';
import en from './i18n/en';
import uk from './i18n/uk';
import {SimpleBlockContextAction} from './blocks/SimpleBlockContextAction';
import {SimpleBlockSettingsPanelRegistry} from './blocks/SimpleBlockSettingsPanelRegistry';
import {SimpleBlockBackgroundColorControl} from './controls/SimpleBlockBackgroundColorControl';
import styles from './styles/extension-styles.css?raw';
import {BrandColorPickerUIElement} from './ui-elements/BrandColorPickerUIElement';
import {BuildInUIElementsDemoControl} from './controls/BuildInUIElementsDemoControl';

export default new ExtensionBuilder()
    .withLocalization({
        'en': en,
        'uk': uk,
    })
    .withStyles(styles)
    .addBlock(SimpleBlock)
    .addContextAction(SimpleBlockContextAction)
    .addControl(SimpleBlockBackgroundColorControl)
    .addControl(BuildInUIElementsDemoControl)
    .addUiElement(BrandColorPickerUIElement)
    .withSettingsPanelRegistry(SimpleBlockSettingsPanelRegistry)
    .build();
