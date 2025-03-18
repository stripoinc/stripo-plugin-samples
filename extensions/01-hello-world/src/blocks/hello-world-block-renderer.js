import {BlockRenderer} from '@stripo/ui-editor-extensions';

export class HelloWorldBlockRenderer extends BlockRenderer {

    /**
     * Replaces actual HTML code like
     *    Hello, #{NAME}
     * with default values to display
     *    Hello, World
     */
    getPreviewHtml(node) {
        return node.getOuterHTML().replace(`#{NAME}`, 'World');
    }
}
