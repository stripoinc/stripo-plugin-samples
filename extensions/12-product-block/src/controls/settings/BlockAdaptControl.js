import {StructureAdaptBuiltInControl} from '@stripoinc/ui-editor-extensions';

export const BLOCK_ADAPT_CONTROL_ID = 'product-block-adapt-control';

export class BlockAdaptControl extends StructureAdaptBuiltInControl {
    getId() {
        return BLOCK_ADAPT_CONTROL_ID;
    }
}
