import {Control, UEAttr, UIElementType} from '@stripoinc/ui-editor-extensions';
import LayoutHelper , {Orientation} from '../../../block/LayoutHelper';

export const CONTROL_ID_ORIENTATION = 'product-block-orientation-control';

export class CardOrientationControl extends Control {
    getId() {
        return CONTROL_ID_ORIENTATION;
    }

    getTemplate() {
        return `
            <div class="container two-columns">
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Orientation')}:"></${UIElementType.LABEL}>
                
                <${UIElementType.RADIO_BUTTONS} ${UEAttr.RADIO_BUTTONS.name}="orientation">
                    <${UIElementType.RADIO_ITEM} 
                        ${UEAttr.RADIO_ITEM.hint}="${this.api.translate('Horizontal')}" 
                        ${UEAttr.RADIO_ITEM.icon}="horizontal"
                        ${UEAttr.RADIO_ITEM.value}="${Orientation.HORIZONTAL}">
                    </${UIElementType.RADIO_ITEM}>  
                    
                    <${UIElementType.RADIO_ITEM} 
                        ${UEAttr.RADIO_ITEM.hint}="${this.api.translate('Vertical')}" 
                        ${UEAttr.RADIO_ITEM.icon}="vertical" 
                        ${UEAttr.RADIO_ITEM.value}="${Orientation.VERTICAL}">
                    </${UIElementType.RADIO_ITEM}>                
                </${UIElementType.RADIO_BUTTONS}>
            </div>`;
    }

    onRender() {
        this.api.onValueChanged('orientation', (newValue, oldValue) => {
            LayoutHelper.updateOrientation(newValue, this.node, this.api.getDocumentModifier());
        });
    }

    onTemplateNodeUpdated(node) {
        this.node = node;

        this.api.updateValues({
            orientation: this.node.getNodeConfig().orientation
        })
    }

    isVisible(_node) {
        return !!_node.getNodeConfig().orientation;
    }
}
