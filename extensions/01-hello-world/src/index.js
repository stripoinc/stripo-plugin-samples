import {ExtensionBuilder} from '@stripo/ui-editor-extensions';
import {initPlugin} from './stripo-loader';
import {HelloWorldBlock} from './blocks/hello-world-block';
import en from './i18n/en';
import uk from './i18n/uk';
import {HelloWorldBlockContextAction} from './blocks/hello-world-block-context-action';
import {HelloWorldBlockSettingsPanelRegistry} from './blocks/hello-world-block-settings-panel-registry';
import {HelloWorldBackgroundColorControl} from './controls/hello-world-background-color-control';
import styles from './styles/extension-styles.css?raw';
import {BrandColorPickerUiElement} from './ui-elements/brand-color-picker-ui-element';

const extension = new ExtensionBuilder()
    .withLocalization({
        'en': en,
        'uk': uk,
    })
    .withStyles(styles)
    .addBlock(HelloWorldBlock)
    .addContextAction(HelloWorldBlockContextAction)
    .addControl(HelloWorldBackgroundColorControl)
    .addUiElement(BrandColorPickerUiElement)
    .withSettingsPanelRegistry(HelloWorldBlockSettingsPanelRegistry)
    .build();

initPlugin(extension);
