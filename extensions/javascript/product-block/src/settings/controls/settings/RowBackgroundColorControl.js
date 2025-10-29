import {BlockSelector, StructureBackgroundColorBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const CONTROL_ID_ROW_BACKGROUND_COLOR = 'product-block-row-background-color-control';

export class RowBackgroundColorControl extends StructureBackgroundColorBuiltInControl {
    getId() {
        return CONTROL_ID_ROW_BACKGROUND_COLOR;
    }

    // getTargetNodes(root) {
    //     let querySelectorAll = root.querySelectorAll(`${BlockSelector.STRUCTURE}:not(.esd-extension-block)`);
    //     console.log(querySelectorAll);
    //     return querySelectorAll;
    // }

    isVisible(_node) {
        return !!_node.getNodeConfig().orientation;
    }
}
