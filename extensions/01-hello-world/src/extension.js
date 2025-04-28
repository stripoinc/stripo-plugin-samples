import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {HelloWorldBlock} from './blocks/HelloWorldBlock';
import en from './i18n/en';
import uk from './i18n/uk';
import {HelloWorldBlockContextAction} from './blocks/HelloWorldBlockContextAction';
import {HelloWorldBlockSettingsPanelRegistry} from './blocks/HelloWorldBlockSettingsPanelRegistry';
import {HelloWorldBackgroundColorControl} from './controls/HelloWorldBackgroundColorControl';
import styles from './styles/extension-styles.css?raw';
import {BrandColorPickerUIElement} from './ui-elements/BrandColorPickerUIElement';
import {BuildInUIElementsDemoControl} from './controls/BuildInUIElementsDemoControl';

const extension = new ExtensionBuilder()
    .withLocalization({
        'en': en,
        'uk': uk,
    })
    .withStyles(styles)
    .addBlock(HelloWorldBlock)
    .addContextAction(HelloWorldBlockContextAction)
    .addControl(HelloWorldBackgroundColorControl)
    .addControl(BuildInUIElementsDemoControl)
    .addUiElement(BrandColorPickerUIElement)
    .withSettingsPanelRegistry(HelloWorldBlockSettingsPanelRegistry)
    .build();

export default extension;
