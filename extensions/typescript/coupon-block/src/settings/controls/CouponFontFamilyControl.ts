import {TextFontFamilyBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const COUPON_FONT_FAMILY_CONTROL_ID = 'coupon-font-family-control';


export class CouponFontFamilyControl extends TextFontFamilyBuiltInControl {
    getId(): string {
        return COUPON_FONT_FAMILY_CONTROL_ID;
    }
}
