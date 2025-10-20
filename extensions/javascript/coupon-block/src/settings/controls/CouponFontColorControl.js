import {TextColorBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const COUPON_FONT_COLOR_CONTROL_ID = 'coupon-font-color-control';


export class CouponFontColorControl extends TextColorBuiltInControl {
    getId() {
        return COUPON_FONT_COLOR_CONTROL_ID;
    }
}
