import {HelloWorldBlockRenderer} from './hello-world-block-renderer';
import {Block, ModificationDescription} from '@stripo/ui-editor-extensions';

export class HelloWorldBlock extends Block {
    getId() {
        return 'hello-world-block';
    }

    isEnabled() {
        return true;
    }

    getIcon() {
        return 'new-window';
    }

    getName() {
        return this.api.translate('Hello world block');
    }

    getDescription() {
        return this.api.translate('Hello world block description');
    }

    /**
     * Removes the standard "copy" action and adds a custom magic button action to the context menu.
     */
    getContextActionsIds() {
        return [
            'esd-move',
            'esd-delete',
            'hello-world-magic-button'
        ];
    }

    getCustomRenderer() {
        return HelloWorldBlockRenderer;
    }

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
     * This is an example of possible usage of this lifecycle hook.
     *
     * Removes any duplicate instances of this block from the document on init.
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
     * This is an example of possible usage of this lifecycle hook.
     *
     * Allows only one instance of this block per template.
     */
    onDrop(node) {
        this.api.setViewOnly(true);
        return undefined;
    }

    /**
     * This is an example of possible usage of this lifecycle hook.
     *
     * Allows only one instance of this block per template.
     */
    onDelete(node) {
        this.api.setViewOnly(false);
        return undefined;
    }
}
