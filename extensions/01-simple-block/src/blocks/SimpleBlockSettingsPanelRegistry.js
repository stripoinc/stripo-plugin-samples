import {SettingsPanelRegistry, SettingsPanelTab, SettingsTab, BlockType} from '@stripoinc/ui-editor-extensions';
import {CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID} from '../controls/BuildInUIElementsDemoControl';
import {BLOCK_SIMPLE_ID} from './SimpleBlock';
import {CONTROL_SIMPLE_BLOCK_BACKGROUND_COLOR_ID} from '../controls/SimpleBlockBackgroundColorControl';

/**
 * @extends {SettingsPanelRegistry}
 * Demonstrates how to customize settings panels for blocks.
 * This registry adds a custom settings tab for the 'simple' block
 * and adds a custom control to the standard 'button' block's settings tab.
 */
export class SimpleBlockSettingsPanelRegistry extends SettingsPanelRegistry {

    /**
     * Registers controls for specific blocks within the settings panel.
     * This method modifies the provided map to define which controls appear
     * in which tabs for different blocks.
     *
     * @param {Object.<string, Array<SettingsPanelTab>>} controls - A map where keys are block IDs (e.g., BLOCK_SIMPLE_ID, BlockType.BLOCK_BUTTON)
     *                                                             and values are arrays of SettingsPanelTab instances defining the tabs and controls for that block.
     *                                                             This map is modified in place.
     */
    registerBlockControls(controls) {
        controls[BLOCK_SIMPLE_ID] = [
            new SettingsPanelTab(
                'custom',
                [
                    CONTROL_SIMPLE_BLOCK_BACKGROUND_COLOR_ID
                ])
                .withLabel(this.api.translate('Simple block settings advanced'))
        ];

        controls[BlockType.BLOCK_BUTTON] = [
            new SettingsPanelTab(
                SettingsTab.SETTINGS,
                [
                    CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID
                ])];
    }
}
