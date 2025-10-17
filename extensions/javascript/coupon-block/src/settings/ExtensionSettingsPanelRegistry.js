import {SettingsPanelRegistry, SettingsPanelTab, SettingsTab} from '@stripoinc/ui-editor-extensions';
import {COUPON_FONT_COLOR_CONTROL_ID} from './controls/CouponFontColorControl';
import {COUPON_FONT_SIZE_CONTROL_ID} from './controls/CouponFontSizeControl';
import {COUPON_FONT_FAMILY_CONTROL_ID} from './controls/CouponFontFamilyControl';

export class ExtensionSettingsPanelRegistry extends SettingsPanelRegistry {

    registerBlockControls(controls) {
        controls['coupon-block'] = [
            new SettingsPanelTab(
                SettingsTab.STYLES,
                [
                    COUPON_FONT_FAMILY_CONTROL_ID,
                    COUPON_FONT_SIZE_CONTROL_ID,
                    COUPON_FONT_COLOR_CONTROL_ID
               ]
            )
        ]
    }
}
