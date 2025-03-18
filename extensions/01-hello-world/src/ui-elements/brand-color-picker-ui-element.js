import {UiElement} from '@stripo/ui-editor-extensions';

const BRAND_COLOR = 'greenyellow';

export class BrandColorPickerUiElement extends UiElement {
    getId() {
        return 'brand-color-picker';
    }

    onRender(container) {
        this.button = container.querySelector('button');
        this.button.addEventListener('click', this._onClick.bind(this));
    }

    onDestroy() {
        this.button.removeEventListener('click', this._onClick.bind(this));
    }

    _onClick() {
        this.api.onValueChanged(BRAND_COLOR);
    }

    getTemplate() {
        return `<button class="brand-color-button">${this.api.translate('Brand color')}</button>`
    }
}
