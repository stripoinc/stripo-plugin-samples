import {Control, UEAttr, UIElementType} from '@stripoinc/ui-editor-extensions';
import LayoutHelper, {Orientation} from '../../../block/LayoutHelper';

export const CONTROL_ID_CARDS_PER_ROW = 'product-block-cards-per-row-control';

export class CardsPerRowControl extends Control {
    getId() {
        return CONTROL_ID_CARDS_PER_ROW;
    }

    getTemplate() {
        return `
            <div class="container two-columns">
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Cards per Row')}:"></${UIElementType.LABEL}>
                
                <${UIElementType.COUNTER} 
                    ${UEAttr.COUNTER.name}="cardsPerRow"  
                    ${UEAttr.COUNTER.minValue}="1" 
                    ${UEAttr.COUNTER.maxValue}="4" 
                    ${UEAttr.COUNTER.step}="1" >
                </${UIElementType.COUNTER}>
            </div>`;
    }

    onRender() {
        this.api.onValueChanged('cardsPerRow', (newValue, oldValue) => {
            LayoutHelper.updateColumnsPerRow(newValue, this.node, this.api.getDocumentModifier());
        });
    }

    onTemplateNodeUpdated(node) {
        this.node = node;

        this.api.updateValues({
            'cardsPerRow': this.node.getNodeConfig().columnsPerRow
        });
    }

    isVisible(_node) {
        return _node.getNodeConfig().orientation === Orientation.VERTICAL;
    }
}
