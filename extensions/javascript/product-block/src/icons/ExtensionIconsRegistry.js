import {IconsRegistry} from '@stripoinc/ui-editor-extensions';
import couponBlockIcon from './product.svg?raw';
import horizontal from './horizontal.svg?raw';
import vertical from './vertical.svg?raw';

export class ExtensionIconsRegistry extends IconsRegistry {
    registerIconsSvg(iconsMap) {
        iconsMap['productBlockIcon'] = couponBlockIcon;
        iconsMap['horizontal'] = horizontal;
        iconsMap['vertical'] = vertical;
    }
}
