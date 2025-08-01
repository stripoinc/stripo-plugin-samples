import {BlockType, SettingsPanelRegistry} from '@stripoinc/ui-editor-extensions';
import {LOGO_BLOCK_ID} from './LogoBlock';

export class LogoBlockSettingsPanelRegistry extends SettingsPanelRegistry {
    registerBlockControls(controls) {
        controls[LOGO_BLOCK_ID] = controls[BlockType.BLOCK_IMAGE];
    }
}
