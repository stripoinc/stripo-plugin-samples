import {
    BlockAttr,
    BlockType,
    Control,
    ModificationDescription,
    UEAttr,
    UIElementType
} from '@stripoinc/ui-editor-extensions';

export const CONTROL_PRODUCT_BLOCK_SELECT_PRODUCT_ITEMS_ID = 'product-block-select-product-items-control';

export class SelectProductItemsControl extends Control {
    getId() {
        return CONTROL_PRODUCT_BLOCK_SELECT_PRODUCT_ITEMS_ID;
    }

    getTemplate() {
        return `
            <div class="container">
                <${UIElementType.LABEL} ${UEAttr.LABEL.text}="${this.api.translate('Number of Product Cards')}:"></${UIElementType.LABEL}>
                <${UIElementType.SELECTPICKER} ${UEAttr.SELECTPICKER.name}="productItemsCount"
                    ${UEAttr.SELECTPICKER.placeholder}="${this.api.translate('Select the number of product cards')}">
                    ${[1, 2, 3, 4, 5].map(key => `<${UIElementType.SELECT_ITEM} ${UEAttr.SELECT_ITEM.text}="${key}" ${UEAttr.SELECT_ITEM.value}="${key}"></${UIElementType.SELECT_ITEM}>`).join('')}
                </${UIElementType.SELECTPICKER}>
            </div>`;
    }

    onRender() {
        this.api.onValueChanged('productItemsCount', (newValue, oldValue) => {
            this.api.getDocumentModifier()
                .modifyHtml(this.node)
                .multiRowStructureModifier()
                .updateLayoutWithContent([
                        {width: '25%', contentType: 'SPACER'},  // Empty placeholder
                        '50%',                                  // Main content area
                        '25%'                                   // Sidebar area
                    ],
                    [
                        `<div>Sidebar Widget 1</div>`,
                        '<div>Sidebar Widget 2</div>'
                    ])
                .apply(new ModificationDescription('Changed product cards count'));

        });
    }

    // onRender() {
    //     this.api.onValueChanged('productItemsCount', (newValue, oldValue) => {
    //         this.api.getDocumentModifier()
    //             .modifyHtml(this.node)
    //             // .setNodeConfig({...this.node.getNodeConfig(), productItems: newValue})
    //             .multiRowStructureModifier()
    //             .updateLayoutWithContent([
    //                     // {width: '25%', contentType: 'SPACER'},  // Empty placeholder
    //                     {width: '25%', contentType: 'SPACER'},  // Empty placeholder
    //                     '50%',                                  // Main content area
    //                     '25%'                                   // Sidebar area
    //                 ],
    //                 [
    //                     `<${BlockType.BLOCK_IMAGE}
    //                  ${BlockAttr.BLOCK_IMAGE.src}="https://ext.stripocdn.email/content/guids/CABINET_aaba655ea1750215d7f8634c98324dd3/images/89211627300127242.png"
    //                 ${BlockAttr.BLOCK_IMAGE.alt}="Stripo"
    //                 ${BlockAttr.BLOCK_IMAGE.href}="https://stripo.email">
    //             </${BlockType.BLOCK_IMAGE}>
    //
    //             <${BlockType.BLOCK_TEXT}>
    //                 <p><b>Hello!</b></p>
    //             </${BlockType.BLOCK_TEXT}>`,
    //                     '<div>Sidebar Widget</div>'
    //                 ])
    //             .apply(new ModificationDescription('Changed product cards count')
    //                 // .withParams({color: newValue})
    //             );
    //
    //     });
    // }

    onTemplateNodeUpdated(node) {
        this.node = node;
    }
}
