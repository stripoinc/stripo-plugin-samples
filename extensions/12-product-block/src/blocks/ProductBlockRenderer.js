import {BlockRenderer} from '@stripoinc/ui-editor-extensions';

export class ProductBlockRenderer extends BlockRenderer {

    getPreviewHtml(node) {
        return node.getOuterHTML();
    }
}
