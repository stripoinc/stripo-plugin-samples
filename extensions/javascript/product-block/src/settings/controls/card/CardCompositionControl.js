import {Control, UEAttr, UIElementType} from '@stripoinc/ui-editor-extensions';
import LayoutHelper, {CardItem, Orientation} from '../../../block/LayoutHelper';
import ControlUtils from '../ControlUtils';

export const CONTROL_ID_CARD_COMPOSITION = 'product-block-card-composition-control';

export class CardCompositionControl extends Control {
    getId() {
        return CONTROL_ID_CARD_COMPOSITION;
    }

    getTemplate() {
        return `
            <div class="container">
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Composition')}:"></${UIElementType.LABEL}>
            
                <${UIElementType.ORDERABLE} name="orderableCardComposition" ${UEAttr.ORDERABLE.position}="LEFT">
                    ${Object.values(CardItem).map(itemName => this.#buildCompositionItem(itemName, ControlUtils.controlsList
                        .filter(control => control.itemName === itemName))).join('')}
                </${UIElementType.ORDERABLE}>
            </div>`;
    }

    onRender() {
        Object.values(CardItem).forEach(itemName => {
            this.api.onValueChanged(`${itemName}Visibility`, (newValue, oldValue) => {
                LayoutHelper.updateVisibility(itemName, newValue, this.node, this.api.getDocumentModifier());
                this.api.setUIEAttribute(`${itemName}Expandable`, UEAttr.EXPANDABLE.disabled, !newValue);
            });
        });

        this.api.onValueChanged('orderableCardComposition', (newValue, oldValue) => {
            LayoutHelper.updateOrder(newValue, this.node, this.api.getDocumentModifier());
        });
    }

    onTemplateNodeUpdated(node) {
        this.node = node;
        const values = {};
        node.getNodeConfig().items?.forEach(item => {
            values[`${item.name}Visibility`] = item.isVisible;
            this.api.setUIEAttribute(`${item.name}Expandable`, UEAttr.EXPANDABLE.disabled, !item.isVisible);
        });

        this.api.setUIEAttribute('orderableCardComposition', UEAttr.ORDERABLE.disabled, node.getNodeConfig().orientation === Orientation.HORIZONTAL);
        this.api.updateValues(values);
    }

    isVisible(_node) {
        return !!_node.getNodeConfig().orientation;
    }


    #buildCompositionItem(itemName, itemControls) {
        return `<${UIElementType.ORDERABLE_ITEM} ${UEAttr.ORDERABLE.name}="${itemName}">
                <${UIElementType.EXPANDABLE} ${UEAttr.EXPANDABLE.name}="${itemName}Expandable">
                    <${UIElementType.EXPANDABLE_HEADER}>
                        <div class="container two-columns">
                            <${UIElementType.SWITCHER} ${UEAttr.SWITCHER.name}="${itemName}Visibility"></${UIElementType.SWITCHER}>
                            <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate(`control.composition.${itemName}`)}"></${UIElementType.LABEL}>
                        </div>
                    </${UIElementType.EXPANDABLE_HEADER}>
                    <${UIElementType.EXPANDABLE_CONTENT}>
                        ${itemControls.map(itemControl => `<${UIElementType.NESTED_CONTROL} class="composition-control"
                            ${UEAttr.NESTED_CONTROL.controlId}="${itemControl.id}">
                        </${UIElementType.NESTED_CONTROL}>`).join('')}
                    </${UIElementType.EXPANDABLE_CONTENT}>
                </${UIElementType.EXPANDABLE}>
            </${UIElementType.ORDERABLE_ITEM}>`
    }
}


