import {Block, BlockCompositionType, BlockType} from '@stripoinc/ui-editor-extensions';

export const BLOCK_STRUCTURE_WITH_EMPTY_CONTAINER_ID = 'structure-block-with-empty-container';

export class StructureBlockWithEmptyContainer extends Block {
    getId() {
        return BLOCK_STRUCTURE_WITH_EMPTY_CONTAINER_ID;
    }

    isEnabled() {
        return true;
    }

    getBlockCompositionType() {
        return BlockCompositionType.STRUCTURE;
    }

    getIcon() {
        return 'magic';
    }

    getName() {
        return this.api.translate('Structure block with empty container');
    }

    getDescription() {
        return this.api.translate('Structure block with empty container description');
    }

    getTemplate() {
        return `
            <td>
              <h3>CUSTOM STRUCTURE</h3>
              <${BlockType.EMPTY_CONTAINER}></${BlockType.EMPTY_CONTAINER}>
            </td>
        `
    }
}
