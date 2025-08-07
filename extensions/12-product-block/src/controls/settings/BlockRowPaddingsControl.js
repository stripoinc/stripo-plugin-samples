import {StructurePaddingsBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const BLOCK_ROW_PADDINGS_CONTROL_ID = 'product-block-row-paddings-control';

export class BlockRowPaddingsControl extends StructurePaddingsBuiltInControl {
    getId() {
        return BLOCK_ROW_PADDINGS_CONTROL_ID;
    }

    getTargetNodes(root) {
        const rows = root.querySelectorAll('.esd-structure');
        return rows.length ? rows : [root];
    }
}
