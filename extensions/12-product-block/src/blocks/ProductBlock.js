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

    // getCustomRenderer() {
    //     return ProductBlockRenderer;
    // }

    allowInnerBlocksSelection() {
        return false;
    }

    allowInnerBlocksDND() {
        return false;
    }

    // getTemplate() {
    //     return `
    //         <${BlockType.STRUCTURE}>
    //             <${BlockType.EMPTY_CONTAINER}></${BlockType.EMPTY_CONTAINER}>
    //         </${BlockType.STRUCTURE}>`
    // }

    getTemplate() {
        const container = `
            <${BlockType.CONTAINER} ${BlockAttr.CONTAINER.widthPercent}="50">
                <${BlockType.BLOCK_IMAGE}
                    ${BlockAttr.BLOCK_IMAGE.src}="https://rf.stripocdn.email/content/guids/CABINET_a72abd995606a03654e2f4a6dac6aa4199889bd9c4261c4b3200c3d1b63c8700/images/g9fa3a8f2503b5df8ba9eb4f115ad6503e44d19921df74d38db793e722379a0b4fb3a097c9e80ededb83d0406223a755f_640.jpeg"
                    ${BlockAttr.BLOCK_IMAGE.alt}="IPhone"
                    ${BlockAttr.BLOCK_IMAGE.href}="https://stripo.email">
                </${BlockType.BLOCK_IMAGE}>

                <${BlockType.BLOCK_TEXT} class="product-card-name">
                    <p style="color: #555555; line-height: 200%">
                        <strong>IPhone</strong>
                    </p>
                </${BlockType.BLOCK_TEXT}>
                
                <${BlockType.BLOCK_TEXT} class="product-card-price" align="center">
                    <p style="color: #555555;">
                        999$
                    </p>
                </${BlockType.BLOCK_TEXT}>
                
                <${BlockType.BLOCK_BUTTON}>
                    BUY
                </${BlockType.BLOCK_BUTTON}>
            </${BlockType.CONTAINER}>
        `;

        return `<${BlockType.STRUCTURE}>
            ${container}
            ${container}
        </${BlockType.STRUCTURE}>`;
    }
}
