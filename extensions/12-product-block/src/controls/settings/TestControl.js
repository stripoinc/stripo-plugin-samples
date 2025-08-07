import {
    BlockAttr,
    BlockType,
    Control,
    ModificationDescription,
    UEAttr,
    UIElementType
} from '@stripoinc/ui-editor-extensions';

export const CONTROL_PRODUCT_BLOCK_CARD_ORIENTATION_ID = 'product-block-card-orientation-control';
export const ORIENTATION_UI_ELEMENT_NAME = 'cardOrientation';

export class CardOrientationControl extends Control {
    getId() {
        return CONTROL_PRODUCT_BLOCK_CARD_ORIENTATION_ID;
    }

    getTemplate() {
        return `
            <div class="container two-columns">
                <${UIElementType.REPEATABLE} name="myRepeat">
                    <div>
                        <${UIElementType.LABEL} name="myLabel" ${UEAttr.LABEL.text}="${this.api.translate('Preheader')}:"></${UIElementType.LABEL}>
                        
                        <${UIElementType.TEXTAREA} ${UEAttr.TEXTAREA.name}="preheader" ai="true" emodji="true" symbolsCount="true"></${UIElementType.TEXTAREA}>
                        
                        
                    </div>
                </${UIElementType.REPEATABLE}>
                
                <${UIElementType.BUTTON} name="addMore">Add More</${UIElementType.BUTTON}>
            </div>`;
    }

    onRender() {
        this.api.onValueChanged('addMore', (newValue, oldValue) => {
            this.api.updateValues({
                myRepeat: [
                    {
                        'preheader': "Preheader 1",
                        'myLabel': 'Title 1'
                    },
                    {
                        'preheader': "Preheader 2",
                        'myLabel': 'Title 2'
                    },
                    {
                        'preheader': "Preheader 3",
                        'myLabel': 'Title 3'
                    }
                ]
            });
        });
    }

    onTemplateNodeUpdated(node) {
        this.node = node;

        this.api.updateValues({
            myRepeat: [
                {
                    'preheader': "Preheader 1",
                    'myLabel': 'Title 1'
                },
                {
                    'preheader': "Preheader 2",
                    'myLabel': 'Title 2'
                }
            ]
        })
    }
}
