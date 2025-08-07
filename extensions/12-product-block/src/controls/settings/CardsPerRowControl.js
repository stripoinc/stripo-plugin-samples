import {
    BlockAttr,
    BlockType,
    Control,
    ModificationDescription,
    UEAttr,
    UIElementType
} from '@stripoinc/ui-editor-extensions';

export const CARDS_PER_ROW_CONTROL_ID = 'product-block-cards-per-row-control';
export const CARDS_PER_ROW_UI_ELEMENT = 'cardsPerRow';

export class CardsPerRowControl extends Control {
    getId() {
        return CARDS_PER_ROW_CONTROL_ID;
    }

    getTemplate() {
        return `
            <div class="container two-columns">
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Cards per Row')}:"></${UIElementType.LABEL}>
                
                <${UIElementType.COUNTER} 
                    ${UEAttr.COUNTER.name}="${CARDS_PER_ROW_UI_ELEMENT}" 
                    ${UEAttr.COUNTER.minValue}="1" 
                    ${UEAttr.COUNTER.maxValue}="4" 
                    ${UEAttr.COUNTER.step}="1" >
                </${UIElementType.COUNTER}>
            </div>`;
    }

    onRender() {
        this.api.onValueChanged(CARDS_PER_ROW_UI_ELEMENT, (newValue, oldValue) => {
            console.log(`Cards per row changed from ${oldValue} to ${newValue}`);
        });
    }

    onTemplateNodeUpdated(node) {
        this.node = node;

        this.api.updateValues({
            [CARDS_PER_ROW_UI_ELEMENT]: 2 //node.querySelectorAll('.esd-container-frame').length
        })
    }
}
