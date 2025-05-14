import {ContextAction} from '@stripoinc/ui-editor-extensions';

export const CONTEXT_ACTION_MAGIC_BUTTON_ID = 'simple-block-magic-button';

/**
 * Represents a custom context action that appears in the context menu of blocks.
 * This action provides a "Magic button" functionality.
 */
export class SimpleBlockContextAction extends ContextAction {
    /**
     * Returns the unique identifier for this context action.
     * @returns {string} The unique ID.
     */
    getId() {
        return CONTEXT_ACTION_MAGIC_BUTTON_ID;
    }

    /**
     * Returns the CSS class name for the icon of this context action.
     * @returns {string} The icon class name.
     */
    getIconClass() {
        return 'plus';
    }

    /**
     * Returns the display label for this context action.
     * Uses the translation API to support internationalization.
     * @returns {string} The translated label.
     */
    getLabel() {
        return this.api.translate('Magic button');
    }

    /**
     * Handles the click event when the context action is selected.
     * Shows an alert with the outer HTML of the clicked block node.
     * @param {ImmutableHtmlNode} node The HTML node the action is being performed on.
     */
    onClick(node) {
        alert(`Magic button clicked. Block content: ${node.getOuterHTML()}`);
    }
}
