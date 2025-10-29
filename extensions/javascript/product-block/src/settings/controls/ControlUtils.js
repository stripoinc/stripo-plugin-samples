import {
    ButtonAlignBuiltInControl, ButtonBorderBuiltInControl, ButtonBorderRadiusBuiltInControl,
    ButtonColorBuiltInControl,
    ButtonFitToContainerBuiltInControl, ButtonMarginsBuiltInControl,
    ButtonPaddingsBuiltInControl, ButtonTextBuiltInControl, ButtonTextStyleAndFontColorBuiltInControl,
    ImageSizeBuiltInControl,
    TextAlignBuiltInControl,
    TextColorBuiltInControl,
    TextFontFamilyBuiltInControl,
    TextLineSpacingBuiltInControl,
    TextPaddingsBuiltInControl,
    TextSizeBuiltInControl,
    TextStyleBuiltInControl
} from '@stripoinc/ui-editor-extensions';
import {CardItem} from '../../block/LayoutHelper';


class ControlUtils {
    static controlsList = [];

    static {
        this.controlsList = [
            {
                itemName: CardItem.IMAGE,
                id: 'product-block-card-image-size-control',
                buildInClass: ImageSizeBuiltInControl
            },
            ...this.#createTextItemControls(CardItem.NAME, 'product-card-name'),
            ...this.#createTextItemControls(CardItem.VENDOR_CODE, 'product-card-vendor-code'),
            ...this.#createTextItemControls(CardItem.DIMENSIONS, 'product-card-dimensions'),
            ...this.#createTextItemControls(CardItem.PRICE, 'product-card-price'),
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-text-control',
                buildInClass: ButtonTextBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-text-style-control',
                buildInClass: ButtonTextStyleAndFontColorBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-color-control',
                buildInClass: ButtonColorBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-border-radius-control',
                buildInClass: ButtonBorderRadiusBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-align-control',
                buildInClass: ButtonAlignBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-fit-container-control',
                buildInClass: ButtonFitToContainerBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-border-control',
                buildInClass: ButtonBorderBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-paddings-control',
                buildInClass: ButtonPaddingsBuiltInControl
            },
            {
                itemName: CardItem.BUTTON,
                id: 'product-block-card-button-margins-control',
                buildInClass: ButtonMarginsBuiltInControl
            }
        ]
    }

    static registerControls(extensionBuilder) {
        this.controlsList.forEach(control => {
            extensionBuilder.addControl(this.#makeBuiltInControlClass(control));
        })
    }

    static #createTextItemControls(itemName, itemClassName) {
        return [
            {
                itemName: itemName,
                id: `product-block-card-${itemName}-text-color-control`,
                buildInClass: TextColorBuiltInControl,
                getTargetNodes: function(root) {
                    return root.querySelectorAll(`.${itemClassName}`);
                }
            },
            {
                itemName: itemName,
                id: `product-block-card-${itemName}-text-align-control`,
                buildInClass: TextAlignBuiltInControl,
                getTargetNodes: function(root) {
                    return root.querySelectorAll(`.${itemClassName}`);
                }
            },
            {
                itemName: itemName,
                id: `product-block-card-${itemName}-font-family-control`,
                buildInClass: TextFontFamilyBuiltInControl,
                getTargetNodes: function(root) {
                    return root.querySelectorAll(`.${itemClassName}`);
                }
            },
            {
                itemName: itemName,
                id: `product-block-card-${itemName}-text-size-control`,
                buildInClass: TextSizeBuiltInControl,
                getTargetNodes: function(root) {
                    return root.querySelectorAll(`.${itemClassName}`);
                }
            },
            {
                itemName: itemName,
                id: `product-block-card-${itemName}-text-style-control`,
                buildInClass: TextStyleBuiltInControl,
                getTargetNodes: function(root) {
                    return root.querySelectorAll(`.${itemClassName}`);
                }
            },
            {
                itemName: itemName,
                id: `product-block-card-${itemName}-line-spacing-control`,
                buildInClass: TextLineSpacingBuiltInControl,
                getTargetNodes: function(root) {
                    return root.querySelectorAll(`.${itemClassName}`);
                }
            },
            {
                itemName: itemName,
                id: `product-block-card-${itemName}-text-padding-control`,
                buildInClass: TextPaddingsBuiltInControl,
                getTargetNodes: function(root) {
                    return root.querySelectorAll(`.${itemClassName}`);
                }
            }
        ];
    }

    static #makeBuiltInControlClass(data) {
        return class extends data.buildInClass {
            getId() {
                return data.id;
            }

            getTargetNodes(root) {
                return data.getTargetNodes
                    ? data.getTargetNodes.call(this, root)
                    : super.getTargetNodes(root);
            }

            getLabels() {
                return data.getLabels
                    ? data.getLabels.call(this)
                    : super.getLabels();
            }

            isVisible(node) {
                return data.isVisible ? data.isVisible.call(this, node) : !!node.getNodeConfig().orientation;
            }
        };
    }
}

export default ControlUtils;

