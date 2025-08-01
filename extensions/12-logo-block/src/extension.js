import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {LogoBlock} from './LogoBlock';
import {LogoBlockSettingsPanelRegistry} from './LogoBlockSettingsPanelRegistry';

export default new ExtensionBuilder()
    .addBlock(LogoBlock)
    .withSettingsPanelRegistry(LogoBlockSettingsPanelRegistry)
    .build();
