import {Block, BlockAttr, BlockCompositionType, BlockType} from '@stripoinc/ui-editor-extensions';

export const PRODUCT_BLOCK_ID = 'product-block';

export class ProductBlock extends Block {
    getId() {
        return PRODUCT_BLOCK_ID;
    }

    getBlockCompositionType() {
        return BlockCompositionType.STRUCTURE;
    }

    getIcon() {
        return 'new-window';
    }

    getName() {
        return this.api.translate('Product block');
    }

    getDescription() {
        return this.api.translate('Product block description');
    }

    allowInnerBlocksSelection() {
        return false;
    }

    allowInnerBlocksDND() {
        return false;
    }

    getTemplate() {
        return `
            <td>
                <${BlockType.CONTAINER} ${BlockAttr.CONTAINER.widthPercent}="100">
                    <${BlockType.BLOCK_TEXT}>
                        <p>Select products</p>
                    </${BlockType.BLOCK_TEXT}>    
                </${BlockType.CONTAINER}>
            </td>`;
    }
}
