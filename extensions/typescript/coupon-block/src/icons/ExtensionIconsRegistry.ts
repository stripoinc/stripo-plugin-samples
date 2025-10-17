import {IconsRegistry} from '@stripoinc/ui-editor-extensions';
import couponBlockIcon from './coupon.svg?raw';

export class ExtensionIconsRegistry extends IconsRegistry {
    registerIconsSvg(iconsMap: Record<string, string>): void {
        iconsMap['couponBlockIcon'] = couponBlockIcon;
    }
}
