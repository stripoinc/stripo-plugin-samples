import {ContextAction} from '@stripo/ui-editor-extensions';

export class HelloWorldBlockContextAction extends ContextAction {
    getId() {
        return 'hello-world-magic-button';
    }

    getIconClass() {
        return 'plus';
    }

    getLabel() {
        return this.api.translate('Magic button');
    }

    onClick(node) {
        alert(`Magic button clicked. Block content: ${node.getOuterHTML()}`);
    }
}
