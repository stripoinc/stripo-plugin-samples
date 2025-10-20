import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import {ExtensionIconsRegistry} from './icons/ExtensionIconsRegistry';
import {CouponBlock} from './CouponBlock';
import en from './i18n/en';
import es from './i18n/es';
import fr from './i18n/fr';
import {ExtensionSettingsPanelRegistry} from './settings/ExtensionSettingsPanelRegistry';
import {CouponFontColorControl} from './settings/controls/CouponFontColorControl';
import {CouponFontSizeControl} from './settings/controls/CouponFontSizeControl';
import {CouponFontFamilyControl} from './settings/controls/CouponFontFamilyControl';

const extension = new ExtensionBuilder()
    .withIconsRegistry(ExtensionIconsRegistry)
    .withLocalization({
        'en': en,
        'es': es,
        'fr': fr
    })
    .withSettingsPanelRegistry(ExtensionSettingsPanelRegistry)
    .addControl(CouponFontColorControl)
    .addControl(CouponFontSizeControl)
    .addControl(CouponFontFamilyControl)
    .addBlock(CouponBlock)
    .build();

export default extension;
