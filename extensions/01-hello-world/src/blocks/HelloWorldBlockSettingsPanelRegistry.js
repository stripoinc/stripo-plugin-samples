import {SettingsPanelRegistry, SettingsPanelTab, SettingsTab, UEBlock} from '@stripoinc/ui-editor-extensions';
import {CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID} from '../controls/BuildInUIElementsDemoControl';
import {BLOCK_HELLO_WORLD_ID} from './HelloWorldBlock';
import {CONTROL_HELLO_WORLD_BACKGROUND_COLOR_ID} from '../controls/HelloWorldBackgroundColorControl';

/**
 * @extends {SettingsPanelRegistry}
 * Demonstrates how to customize settings panels for blocks.
 * This registry adds a custom settings tab for the 'hello-world' block
 * and adds a custom control to the standard 'button' block's settings tab.
 */
export class HelloWorldBlockSettingsPanelRegistry extends SettingsPanelRegistry {

    /**
     * Registers controls for specific blocks within the settings panel.
     * This method modifies the provided map to define which controls appear
     * in which tabs for different blocks.
     *
     * @param {Object.<string, Array<SettingsPanelTab>>} controls - A map where keys are block IDs (e.g., BLOCK_HELLO_WORLD_ID, UEBlock.BLOCK_BUTTON)
     *                                                             and values are arrays of SettingsPanelTab instances defining the tabs and controls for that block.
     *                                                             This map is modified in place.
     */
    registerBlockControls(controls) {
        controls[BLOCK_HELLO_WORLD_ID] = [
            new SettingsPanelTab(
                'custom',
                [
                    CONTROL_HELLO_WORLD_BACKGROUND_COLOR_ID
                ])
                .withLabel(this.api.translate('Hello world settings advanced'))
        ];

        controls[UEBlock.BLOCK_BUTTON] = [
            new SettingsPanelTab(
                SettingsTab.SETTINGS,
                [
                    CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID
                ])];
    }
}
