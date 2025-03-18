import {SettingsPanelRegistry, SettingsPanelTab} from '@stripo/ui-editor-extensions';

export class HelloWorldBlockSettingsPanelRegistry extends SettingsPanelRegistry {

    /**
     * This is an example of possible usage of SettingsPanelRegistry.
     *
     * Creates new settings tab and add own control for hello-world block.
     */
    registerBlockControls(blockControlsMap) {
        blockControlsMap['hello-world-block'] = [
            new SettingsPanelTab(
                'custom',
                [
                    'hello-world-background-color-control'
                ])
                .withLabel(this.api.translate('Hello world settings advanced'))
        ];
    }
}
