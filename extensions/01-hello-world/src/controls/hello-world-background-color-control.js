import {ModificationDescription, UiControl} from '@stripo/ui-editor-extensions';

const COLOR_ELEMENT_NAME = 'helloWorldBackgroundColor';

export class HelloWorldBackgroundColorControl extends UiControl {
    getId() {
        return 'hello-world-background-color-control';
    }

    /**
     *
     * Used custom UiElement 'brand-color-picker'
     */
    getTemplate() {
        return `
            <div>
                <ue-label value="${this.api.translate('Background color')}:"></ue-label>
                <brand-color-picker name="${COLOR_ELEMENT_NAME}"></brand-color-picker>
            </div>`;
    }

    onRender() {
        this.api.onValueChanged(COLOR_ELEMENT_NAME, (newValue, oldValue) => {
                this.api.getDocumentModifier()
                    .modifyHtml(this.node)
                        .setAttribute('bgcolor', newValue)
                    .apply(new ModificationDescription('Set background color to {color}').withParams({color: newValue}));
        });

    }

    onTemplateNodeUpdated(node) {
        this.node = node;
        this.api.updateValues({
            [COLOR_ELEMENT_NAME]: node.getAttribute('bgcolor'),
        });
    }
}
