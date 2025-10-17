import {TextSizeBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const COUPON_FONT_SIZE_CONTROL_ID = 'coupon-font-size-control';


export class CouponFontSizeControl extends TextSizeBuiltInControl {
    getId() {
        return COUPON_FONT_SIZE_CONTROL_ID;
    }
}
