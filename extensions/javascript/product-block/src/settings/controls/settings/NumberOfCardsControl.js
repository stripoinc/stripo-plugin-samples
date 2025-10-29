import {Control, UEAttr, UIElementType} from '@stripoinc/ui-editor-extensions';
import LayoutHelper from '../../../block/LayoutHelper';

export const CONTROL_ID_NUMBER_OF_CARDS = 'product-block-number-of-cards-control';

export class NumberOfCardsControl extends Control {
    getId() {
        return CONTROL_ID_NUMBER_OF_CARDS;
    }

    getTemplate() {
        return `
            <div class="container">
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Number of Product Cards')}:"></${UIElementType.LABEL}>

                <${UIElementType.SELECTPICKER} ${UEAttr.SELECTPICKER.name}="numberOfCards"
                    ${UEAttr.SELECTPICKER.placeholder}="${this.api.translate('Number of cards to show')}">
                </${UIElementType.SELECTPICKER}>
            </div>`;
    }

    onRender() {
        const selectItems = [];
        for (let i = 1; i <= (this.api.getEditorConfig().productBlock?.maxCardsCount || 10); i++) {
            selectItems.push({
                [UEAttr.SELECT_ITEM.text]: i,
                [UEAttr.SELECT_ITEM.value]: i,
            })
        }
        this.api.setUIEAttribute(
            'numberOfCards',
            UEAttr.SELECTPICKER.items,
            selectItems);


        this.api.onValueChanged('numberOfCards', (newValue, oldValue) => {
            LayoutHelper.updateNumberOfCards(newValue, this.node, this.api.getDocumentModifier());
        });
    }

    onTemplateNodeUpdated(node) {
        this.node = node;

        this.api.updateValues({
            'numberOfCards': this.node.getNodeConfig().numberOfCards
        })
    }
}
