import {BlockRenderer} from '@stripoinc/ui-editor-extensions';

export class ProductBlockRenderer extends BlockRenderer {

    getPreviewInnerHtml(node) {
        return node.getInnerHTML();
    }

    getPreviewHtml(node) {
        // if (!node.getNodeConfig().productConfig) {
        //     return this._getEmptyBlockTemplate();
        // } else {
            return node.getOuterHTML();
        // }
    }

    getPreviewInnerHtml(node) {
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
}
