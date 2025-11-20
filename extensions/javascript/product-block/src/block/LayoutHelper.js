import {BlockAttr, BlockSelector, BlockType, ModificationDescription} from '@stripoinc/ui-editor-extensions';

export const ItemMergeTag = {
    IMAGE_SRC:   "%%image_src%%",
    NAME:        "%%name%%",
    VENDOR_CODE: "%%vendorCode%%",
    DIMENSIONS:  "%%dimensions%%",
    PRICE:       "%%price%%",
    ACTION_HREF: "%%action_href%%",
};

export const Orientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL:   'vertical'
};

export const CardItem = {
    IMAGE:       'image',
    NAME:        'name',
    VENDOR_CODE: 'vendorCode',
    DIMENSIONS:  'dimensions',
    PRICE:       'price',
    BUTTON:      'button'
};

export const DEFAULT_CONFIG = {
    numberOfCards: 2,
    columnsPerRow: 2,
    orientation: Orientation.VERTICAL,
    items: [
        {name: CardItem.IMAGE, isVisible: true},
        {name: CardItem.NAME, isVisible: true},
        {name: CardItem.VENDOR_CODE, isVisible: true},
        {name: CardItem.DIMENSIONS, isVisible: true},
        {name: CardItem.PRICE, isVisible: true},
        {name: CardItem.BUTTON, isVisible: true}
    ]
};

const DEFAULT_BLOCK_IMAGE = `
    <${BlockType.BLOCK_IMAGE}
        ${BlockAttr.BLOCK_IMAGE.src}="${ItemMergeTag.IMAGE_SRC}"
        ${BlockAttr.BLOCK_IMAGE.alt}="${ItemMergeTag.NAME}"
        ${BlockAttr.BLOCK_IMAGE.href}="${ItemMergeTag.ACTION_HREF}">
    </${BlockType.BLOCK_IMAGE}>
`;

const DEFAULT_BLOCK_NAME = `
    <${BlockType.BLOCK_TEXT} align="center" class="product-card-name">
        <p style="color: #555555; line-height: 200%; font-size: 14px">
            <strong>${ItemMergeTag.NAME}</strong>
        </p>
    </${BlockType.BLOCK_TEXT}>
`;

const DEFAULT_BLOCK_VENDOR_CODE = `
    <${BlockType.BLOCK_TEXT} align="center" class="product-card-vendor-code">
        <p style="color: #555555; line-height: 200%; font-size: 14px">
            <strong>${ItemMergeTag.VENDOR_CODE}</strong>
        </p>
    </${BlockType.BLOCK_TEXT}>
`;

const DEFAULT_BLOCK_DIMENSIONS = `
    <${BlockType.BLOCK_TEXT} align="center" class="product-card-dimensions">
        <p style="color: #8288ab; line-height: 200%; font-size: 12px">
            ${ItemMergeTag.DIMENSIONS}
        </p>
    </${BlockType.BLOCK_TEXT}>
`;

const DEFAULT_BLOCK_PRICE = `
    <${BlockType.BLOCK_TEXT} align="center" class="product-card-price">
        <p style="color: #555555; line-height: 200%">
            <strong>${ItemMergeTag.PRICE}</strong>
        </p>
    </${BlockType.BLOCK_TEXT}>
`;

const DEFAULT_BLOCK_BUTTON = `
    <${BlockType.BLOCK_BUTTON} 
        ${BlockAttr.BLOCK_BUTTON.href}="${ItemMergeTag.ACTION_HREF}">
        Buy
    </${BlockType.BLOCK_BUTTON}>
`;

class LayoutHelper {
    static updateNumberOfCards(numberOfCards, rootNode, modifier) {
        const nodeConfig = this.#getNodeConfig(rootNode);
        nodeConfig.numberOfCards = numberOfCards;
        this.#updateLayout(nodeConfig, rootNode, modifier);
    }

    static updateColumnsPerRow(columnsPerRow, rootNode, modifier) {
        const nodeConfig = this.#getNodeConfig(rootNode);
        nodeConfig.columnsPerRow = columnsPerRow;
        this.#updateLayout(nodeConfig, rootNode, modifier);
    }

    static updateOrientation(orientation, rootNode, modifier) {
        const nodeConfig = this.#getNodeConfig(rootNode);
        nodeConfig.orientation = orientation;
        this.#updateLayout(nodeConfig, rootNode, modifier);
    }

    static updateVisibility(itemName, isVisible, rootNode, modifier) {
        const nodeConfig = this.#getNodeConfig(rootNode);
        nodeConfig.items = nodeConfig.items.map(item => item.name === itemName
            ? { ...item, isVisible }
            : item);
        this.#updateLayout(nodeConfig, rootNode, modifier);
    }

    static updateOrder(items, rootNode, modifier) {
        const nodeConfig = this.#getNodeConfig(rootNode);
        nodeConfig.items.sort((a, b) => items.indexOf(a.name) - items.indexOf(b.name));
        this.#updateLayout(nodeConfig, rootNode, modifier);
    }


    static #getNodeConfig(rootNode) {
        return { ...DEFAULT_CONFIG, ...rootNode.getNodeConfig() };
    }

    static #updateLayout(nodeConfig, rootNode, modifier) {
        const blocksLayout = this.#parseBlocksStyledLayout(rootNode);
        const structureModifier = modifier
            .modifyHtml(rootNode)
            .setNodeConfig(nodeConfig)
            .multiRowStructureModifier();
        if (Orientation.HORIZONTAL === nodeConfig.orientation) {
            this.#setHorizontalLayout(blocksLayout, nodeConfig, structureModifier);
        } else {
            this.#setVerticalLayout(blocksLayout, nodeConfig, structureModifier);
        }
        modifier.apply(new ModificationDescription(`Product block layout updated`));
    }

    static #parseBlocksStyledLayout(rootNode) {
        return {
            [CardItem.IMAGE]: rootNode.querySelector(BlockSelector.IMAGE)?.getOuterHTML() || DEFAULT_BLOCK_IMAGE,
            [CardItem.NAME]: rootNode.querySelector('.product-card-name')?.getOuterHTML() || DEFAULT_BLOCK_NAME,
            [CardItem.VENDOR_CODE]: rootNode.querySelector('.product-card-vendor-code')?.getOuterHTML() || DEFAULT_BLOCK_VENDOR_CODE,
            [CardItem.DIMENSIONS]: rootNode.querySelector('.product-card-dimensions')?.getOuterHTML() || DEFAULT_BLOCK_DIMENSIONS,
            [CardItem.PRICE]: rootNode.querySelector('.product-card-price')?.getOuterHTML() || DEFAULT_BLOCK_PRICE,
            [CardItem.BUTTON]: rootNode.querySelector(BlockSelector.BUTTON)?.getOuterHTML() || DEFAULT_BLOCK_BUTTON
        };
    }

    static #setHorizontalLayout(blocksLayout, nodeConfig, structureModifier) {
        const containersLayout = [];
        const containersContentForRow = [];
        const visibleItems = nodeConfig.items.filter(item => item.isVisible).map(item => item.name);
        if (visibleItems.length <= 1) {
            containersLayout.push('100%');
            containersContentForRow.push(visibleItems.map(item => blocksLayout[item]).join());
        } else if (visibleItems.includes(CardItem.IMAGE) && visibleItems.includes(CardItem.BUTTON) && visibleItems.length == 2) {
            containersLayout.push(...['25%', '75%']);
            containersContentForRow.push(...[
                blocksLayout[CardItem.IMAGE],
                blocksLayout[CardItem.BUTTON]
            ]);
        } else if (visibleItems.includes(CardItem.IMAGE) && !visibleItems.includes(CardItem.BUTTON) && visibleItems.length > 1) {
            containersLayout.push(...['25%', '75%']);
            containersContentForRow.push(...[
                blocksLayout[CardItem.IMAGE],
                visibleItems.filter(item => item !== CardItem.IMAGE).map(item => blocksLayout[item]).join('')
            ]);
        } else if (!visibleItems.includes(CardItem.IMAGE) && visibleItems.includes(CardItem.BUTTON) && visibleItems.length > 1) {
            containersLayout.push(...['75%', '25%']);
            containersContentForRow.push(...[
                visibleItems.filter(item => item !== CardItem.BUTTON).map(item => blocksLayout[item]).join(''),
                blocksLayout[CardItem.BUTTON],
            ]);
        } else if (!visibleItems.includes(CardItem.IMAGE) && !visibleItems.includes(CardItem.BUTTON) && visibleItems.length >= 1) {
            containersLayout.push('100%');
            containersContentForRow.push(visibleItems.map(item => blocksLayout[item]).join());
        } else if (visibleItems.includes(CardItem.IMAGE) && visibleItems.includes(CardItem.BUTTON) && visibleItems.length > 2) {
            containersLayout.push(...['25%', '50%', '25%']);
            containersContentForRow.push(...[
                blocksLayout[CardItem.IMAGE],
                visibleItems.filter(item => item !== CardItem.IMAGE && item !== CardItem.BUTTON).map(item => `<tr>${blocksLayout[item]}</tr>`).join(''),
                blocksLayout[CardItem.BUTTON],
            ]);
        }

        const containersContent = [];
        for (let i = 0; i < nodeConfig.numberOfCards; i++) {
            containersContent.push(...containersContentForRow);
        }

        structureModifier.updateLayoutWithContent(containersLayout, containersContent);
    }

    static #setVerticalLayout(blocksLayout, nodeConfig, structureModifier) {
        const containersLayout = [];
        const containerContent = nodeConfig.items.map(item => item.isVisible ? `<tr>${blocksLayout[item.name]}</tr>` : '').join('');
        switch (nodeConfig.columnsPerRow) {
            case 2:
                containersLayout.push(...['50%', '50%']);
                break;
            case 3:
                containersLayout.push(...['33%', '33%', '33%']);
                break;
            case 4:
                containersLayout.push(...['25%', '25%', '25%', '25%']);
                break;
            default:
                containersLayout.push(...[{width: '33%', contentType: 'SPACER'}, '33%', {width: '33%', contentType: 'SPACER'}]);
                break;
        }

        const containersContent = Array(nodeConfig.numberOfCards).fill(containerContent);
        structureModifier.updateLayoutWithContent(containersLayout, containersContent);
    }
}

export default LayoutHelper;

