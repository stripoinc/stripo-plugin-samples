import {BlockRenderer} from '@stripoinc/ui-editor-extensions';

/**
 * Custom renderer for the SimpleBlock.
 * This renderer modifies the block's HTML for preview purposes within the editor.
 */
export class SimpleBlockRenderer extends BlockRenderer {

    /**
     * Generates a preview HTML string for the block.
     * It replaces the dynamic merge tag `#{NAME}` with the static default value from editor configuration or 'World'
     * to provide a representative preview in the editor UI.
     * @param {ImmutableHtmlNode} node The immutable HTML node representing the block.
     * @returns {string} The modified HTML string for preview.
     */
    getPreviewHtml(node) {
        return node.getOuterHTML().replace(`#{NAME}`, this.api.getEditorConfig()?.extensionBlockParams?.defVal || 'World');
    }
}
