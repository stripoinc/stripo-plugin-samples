import {Block, BlockAttr, BlockCompositionType, BlockType} from '@stripoinc/ui-editor-extensions';
import {ProductBlockRenderer} from './ProductBlockRenderer';

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
        return `<${BlockType.STRUCTURE}>
            <${BlockType.CONTAINER} ${BlockAttr.CONTAINER.widthPercent}="100">
                <${BlockType.BLOCK_TEXT}>
                    <p><b>Hello!</b></p>
                </${BlockType.BLOCK_TEXT}>
            </${BlockType.CONTAINER}>
        </${BlockType.STRUCTURE}>`;
    }


    getTemplate() {
        return `<td></td>`;
    }


    // getTemplate() {
    //     return `<${BlockType.STRUCTURE}>
    //         <${BlockType.CONTAINER} ${BlockAttr.CONTAINER.widthPercent}="50">
    //             <${BlockType.BLOCK_IMAGE}
    //                 ${BlockAttr.BLOCK_IMAGE.src}="https://ext.stripocdn.email/content/guids/CABINET_aaba655ea1750215d7f8634c98324dd3/images/89211627300127242.png"
    //                 ${BlockAttr.BLOCK_IMAGE.alt}="Stripo"
    //                 ${BlockAttr.BLOCK_IMAGE.href}="https://stripo.email">
    //             </${BlockType.BLOCK_IMAGE}>
    //
    //             <${BlockType.BLOCK_TEXT}>
    //                 <p><b>Hello!</b></p>
    //             </${BlockType.BLOCK_TEXT}>
    //         </${BlockType.CONTAINER}>
    //
    //         <${BlockType.CONTAINER} ${BlockAttr.CONTAINER.widthPercent}="50">
    //             <${BlockType.BLOCK_IMAGE}
    //                 ${BlockAttr.BLOCK_IMAGE.src}="https://ext.stripocdn.email/content/guids/CABINET_aaba655ea1750215d7f8634c98324dd3/images/89211627300127242.png"
    //                 ${BlockAttr.BLOCK_IMAGE.alt}="Stripo"
    //                 ${BlockAttr.BLOCK_IMAGE.href}="https://stripo.email">
    //             </${BlockType.BLOCK_IMAGE}>
    //
    //             <${BlockType.BLOCK_TEXT}>
    //                 <p><b>Hello!</b></p>
    //             </${BlockType.BLOCK_TEXT}>
    //         </${BlockType.CONTAINER}>
    //
    //     </${BlockType.STRUCTURE}>`;
    // }


    // getTemplate() {
    //     return `
    //         <td>
    //             <${BlockType.CONTAINER}>
    //                 <${BlockType.BLOCK_HTML}>
    //                     HELLO
    //                 </${BlockType.BLOCK_HTML}>
    //             </${BlockType.CONTAINER}>
    //         </td>`
    // }
}
