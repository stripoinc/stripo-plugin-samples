import {HelloWorldBlockRenderer} from './HelloWorldBlockRenderer';
import {Block, ContextActionType, ModificationDescription} from '@stripoinc/ui-editor-extensions';
import {CONTEXT_ACTION_MAGIC_BUTTON_ID} from './HelloWorldBlockContextAction';

export const BLOCK_HELLO_WORLD_ID = 'hello-world-block';

/**
 * HelloWorldBlock demonstrates a custom block implementation.
 * It includes examples of various lifecycle hooks and customizations.
 */
export class HelloWorldBlock extends Block {
    /**
     * Returns the unique identifier for the block.
     * @returns {string} The unique identifier for this block.
     */
    getId() {
        return BLOCK_HELLO_WORLD_ID;
    }

    /**
     * Determines if the block is enabled in the current editor context.
     * @returns {boolean}
     */
    isEnabled() {
        return true;
    }

    /**
     * Returns the icon representation for the block in the blocks panel.
     * @returns {string} The icon class name.
     */
    getIcon() {
        return 'new-window';
    }

    /**
     * Returns the display name of the block shown in the blocks panel.
     * @returns {string} The translated display name.
     */
    getName() {
        return this.api.translate('Hello world block');
    }

    /**
     * Returns the descriptive text for the block shown in the blocks panel.
     * @returns {string} The translated description.
     */
    getDescription() {
        return this.api.translate('Hello world block description');
    }

    /**
     * Returns an array of context action IDs that apply to this block.
     * Removes the standard "copy" action and adds a custom magic button action to the context menu.
     * @returns {string[]} An array of context action IDs.
     */
    getContextActionsIds() {
        return [
            ContextActionType.MOVE,
            ContextActionType.REMOVE,
            CONTEXT_ACTION_MAGIC_BUTTON_ID
        ];
    }

    /**
     * Returns a custom renderer class for the block, if needed.
     * @returns {Class<HelloWorldBlockRenderer>} The custom renderer class.
     */
    getCustomRenderer() {
        return HelloWorldBlockRenderer;
    }

    /**
     * Returns an HTML string template that defines the structure of the block.
     * @returns {string} The HTML template string.
     */
    getTemplate() {
        return `
            <td align="left">
                <p>
                    Hello, #{NAME}
                </p>
            </td>
        `
    }

    /**
     * Lifecycle hook called when the document is initialized.
     * This example removes any duplicate instances of this block from the document on init.
     * @returns {TemplateModifier | undefined} A modifier instance if changes were made, otherwise undefined.
     */
     onDocumentInit() {
        const blocks = this.api.getDocumentRoot().querySelectorAll(`.${this.getUniqueBlockClassname()}`);
        this.api.setViewOnly(!!blocks.length);

        let modifier = undefined;
        if (blocks.length > 1) {
            modifier = this.api.getDocumentModifier();
            for (let i = 1; i < blocks.length; i++) {
                modifier = modifier.modifyHtml(blocks[i]).delete();
            }
            modifier.apply(new ModificationDescription('Removed extra hello world blocks on init'));
        }
        return modifier;
    }

    /**
     * Lifecycle hook called when the block is dropped into the editor.
     * This example allows only one instance of this block per template by setting it to view-only.
     * @param {ImmutableHtmlNode} node - The node that was dropped.
     * @returns {TemplateModifier | undefined} Always returns undefined in this example.
     */
    onDrop(node) {
        this.api.setViewOnly(true);
        return undefined;
    }

    /**
     * Lifecycle hook called when the block is deleted.
     * This example allows a new instance of the block to be added after deletion by setting view-only to false.
     * @param {ImmutableHtmlNode} node - The node that was deleted.
     * @returns {TemplateModifier | undefined} Always returns undefined in this example.
     */
    onDelete(node) {
        this.api.setViewOnly(false);
        return undefined;
    }
}
