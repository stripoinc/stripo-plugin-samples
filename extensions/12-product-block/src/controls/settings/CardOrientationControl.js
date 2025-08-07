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
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Orientation')}:"></${UIElementType.LABEL}>
                
                <${UIElementType.RADIO_BUTTONS} ${UEAttr.RADIO_BUTTONS.name}="radioItems">
                    <${UIElementType.RADIO_ITEM} 
                        ${UEAttr.RADIO_ITEM.hint}="${this.api.translate('Horizontal')}" 
                        ${UEAttr.RADIO_ITEM.icon}="new-window"
                        ${UEAttr.RADIO_ITEM.value}="1">
                    </${UIElementType.RADIO_ITEM}>  
                    
                    <${UIElementType.RADIO_ITEM} 
                        ${UEAttr.RADIO_ITEM.hint}="${this.api.translate('Vertical')}" 
                        ${UEAttr.RADIO_ITEM.icon}="new-window" 
                        ${UEAttr.RADIO_ITEM.value}="2">
                    </${UIElementType.RADIO_ITEM}>                
                </${UIElementType.RADIO_BUTTONS}>
                
                <${UIElementType.CHECK_BUTTONS} ${UEAttr.RADIO_BUTTONS.name}="checkItems">
                    <${UIElementType.CHECK_ITEM} 
                        ${UEAttr.CHECK_ITEM.hint}="${this.api.translate('Horizontal')}" 
                        ${UEAttr.CHECK_ITEM.icon}="new-window"
                        ${UEAttr.CHECK_ITEM.value}="1">
                    </${UIElementType.CHECK_ITEM}>  
                    
                    <${UIElementType.CHECK_ITEM} 
                        ${UEAttr.CHECK_ITEM.hint}="${this.api.translate('Vertical')}" 
                        ${UEAttr.CHECK_ITEM.icon}="new-window" 
                        ${UEAttr.CHECK_ITEM.value}="2">
                    </${UIElementType.CHECK_ITEM}>                
                </${UIElementType.CHECK_BUTTONS}>
            </div>`;
    }

    onRender() {
        this.api.onValueChanged(ORIENTATION_UI_ELEMENT_NAME, (newValue, oldValue) => {
            console.log(`Orientation changed from ${oldValue} to ${newValue}`);
        });
    }

    onTemplateNodeUpdated(node) {
        this.node = node;

        this.api.updateValues({
            [ORIENTATION_UI_ELEMENT_NAME]: 2
        })
    }
}
