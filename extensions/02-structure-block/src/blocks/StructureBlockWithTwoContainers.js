import {Block, BlockAttr, BlockCompositionType, BlockType} from '@stripoinc/ui-editor-extensions';

export const BLOCK_STRUCTURE_WITH_TWO_CONTAINERS_ID = 'structure-block-with-two-containers';

export class StructureBlockWithTwoContainers extends Block {
    getId() {
        return BLOCK_STRUCTURE_WITH_TWO_CONTAINERS_ID;
    }

    isEnabled() {
        return true;
    }

    getBlockCompositionType() {
        return BlockCompositionType.STRUCTURE;
    }

    getIcon() {
        return 'new-window';
    }

    getName() {
        return this.api.translate('Structure block with two containers');
    }

    getDescription() {
        return this.api.translate('Structure block  with two containers description');
    }

    allowInnerBlocksSelection() {
        return true;
    }

    allowInnerBlocksDND() {
        return false;
    }

    getTemplate() {
        return `
            <td>
                <${BlockType.CONTAINER} ${BlockAttr.CONTAINER.widthPercent}="30">
                    <${BlockType.BLOCK_TEXT}>
                        <p><b>Hello!</b></p>
                    </${BlockType.BLOCK_TEXT}>    
                </${BlockType.CONTAINER}>
                <${BlockType.CONTAINER} ${BlockAttr.CONTAINER.widthPercent}="65">
                    <${BlockType.BLOCK_IMAGE} 
                        ${BlockAttr.BLOCK_IMAGE.src}="https://ext.stripocdn.email/content/guids/CABINET_aaba655ea1750215d7f8634c98324dd3/images/89211627300127242.png" 
                        ${BlockAttr.BLOCK_IMAGE.alt}="Stripo" 
                        ${BlockAttr.BLOCK_IMAGE.href}="https://stripo.email">
                    </${BlockType.BLOCK_IMAGE}> 
                </${BlockType.CONTAINER}>
            </td>`;
    }
}
