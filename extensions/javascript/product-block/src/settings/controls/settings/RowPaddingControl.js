import {BlockSelector, StructurePaddingsBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const CONTROL_ID_ROW_PADDING = 'product-block-row-padding-control';

export class RowPaddingControl extends StructurePaddingsBuiltInControl {
    getId() {
        return CONTROL_ID_ROW_PADDING;
    }

    getTargetNodes(root) {
        return root.querySelectorAll(BlockSelector.STRUCTURE);
    }

    isVisible(_node) {
        return !!_node.getNodeConfig().orientation;
    }
}
