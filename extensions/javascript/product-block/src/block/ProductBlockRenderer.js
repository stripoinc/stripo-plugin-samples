import {BlockRenderer, BlockSelector} from '@stripoinc/ui-editor-extensions';
import {ItemMergeTag, Orientation} from './LayoutHelper';

export class ProductBlockRenderer extends BlockRenderer {
    getPreviewInnerHtml(node) {
        return node.getNodeConfig().orientation
            ? this.#getBlockPreview(node)
            : this.#getEmptyBlockTemplate();
    }

    #getEmptyBlockTemplate() {
        return `
            <div class="empty-product-block">
                <div class="empty-product-block-title">
                    ${this.api.translate('Product Block Configuration Required')}
                </div>
                <div class="empty-product-block-description">
                    ${this.api.translate('Please complete the block configuration to display your product')}
                </div>
            </div>`;
    }

    #getBlockPreview(root) {
        const productsData = this.api.getEditorConfig().productBlock?.products || [
            {
                id: '1',
                name: 'Wireless Headphones',
                price: '$89.99',
                vendorCode: 'B0DW48QHFY',
                image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/gc0859fd762dc386caf67532ca5d9b968b19ba37572e19b72126eb421bee4adfc410dc64eea3dee23cf33c3da5ae06b88_640.jpeg',
                dimensions: '17 x 15 x 6 cm',
                href: 'https://example.com/product/B0DW48QHFY'
            }
        ];

        const div = document.createElement('div');
        div.innerHTML = root.getInnerHTML();

        for (let i = 0; i < root.getNodeConfig().numberOfCards; i++) {
            const productData = productsData[i % productsData.length];
            const productElement = Orientation.HORIZONTAL === root.getNodeConfig().orientation
                ? div.querySelectorAll(BlockSelector.STRUCTURE)[i]
                : div.querySelectorAll(`${BlockSelector.CONTAINER}:not(.es-container-hidden)`)[i];

            if (productElement) {
                productElement.outerHTML = productElement.outerHTML
                    .replaceAll(ItemMergeTag.IMAGE_SRC, productData.image)
                    .replaceAll(ItemMergeTag.NAME, productData.name)
                    .replaceAll(ItemMergeTag.VENDOR_CODE, productData.vendorCode)
                    .replaceAll(ItemMergeTag.DIMENSIONS, productData.dimensions)
                    .replaceAll(ItemMergeTag.PRICE, productData.price)
                    .replaceAll(ItemMergeTag.ACTION_HREF, productData.href);
            }
        }
        return div.innerHTML;
    }
}
