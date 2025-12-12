import {ExternalImageLibraryTab} from '@stripoinc/ui-editor-extensions';
import {ImageLibraryTabUI} from './ImageLibraryTabUI.js';

/**
 * External Image Library Tab Implementation
 * This class implements the ExternalImageLibraryTab interface
 * and delegates all UI logic to ImageLibraryTabUI
 */
export default class MyExternalImageLibraryTab extends ExternalImageLibraryTab {
    constructor() {
        super();
        // Create UI handler instance
        this.ui = new ImageLibraryTabUI();
    }

    /**
     * Required method: Returns the localized name of the tab
     * This name will be displayed as the tab title in the gallery
     * @returns {string} Localized tab name
     */
    getName() {
        return this.api.translate('Custom Images');
    }

    /**
     * Required method: Called when the tab is opened
     * Delegates rendering to the UI class
     * @param {HTMLElement} container - DOM container where content should be rendered
     * @param {Function} onImageSelect - Callback to invoke when an image is selected
     * @param {ImmutableHtmlNode} [_selectedNode] - Optional node context (NEW in v3.4.0)
     */
    openImageLibraryTab(container, onImageSelect, _selectedNode) {
        this.ui.initialize(container, onImageSelect);
    }
}
