import {Block, BlockCompositionType} from '@stripoinc/ui-editor-extensions';
import {ProductBlockRenderer} from './ProductBlockRenderer';

export class ProductBlock extends Block {
    getId() {
        return 'product-block';
    }

    isEnabled() {
        return this.api.getEditorConfig().productBlock?.enabled;
    }

    getBlockCompositionType() {
        return BlockCompositionType.STRUCTURE;
    }

    getIcon() {
        return 'productBlockIcon';
    }

    getName() {
        return this.api.translate('Product');
    }

    getDescription() {
        return this.api.translate('Create a set of product cards for your email');
    }

    getCustomRenderer() {
        return ProductBlockRenderer;
    }

    allowInnerBlocksSelection() {
        return false;
    }

    allowInnerBlocksDND() {
        return false;
    }

    getTemplate() {
        return `<td></td>`;
    }
}
