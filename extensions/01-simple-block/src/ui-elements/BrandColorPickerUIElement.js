import {UIElement} from '@stripoinc/ui-editor-extensions';

const BRAND_COLOR = 'greenyellow';

/**
 * A custom UI element that renders a button to set a predefined brand color.
 * @extends UIElement
 */
export class BrandColorPickerUIElement extends UIElement {
    /**
     * Returns the unique identifier for this UI element.
     * This ID is used to register and reference the element.
     * @returns {string} The unique identifier 'brand-color-picker'.
     */
    getId() {
        return 'brand-color-picker';
    }

    /**
     * Returns the HTML template string for this UI element.
     * The template consists of a button displaying translated text.
     * @returns {string} The HTML template string.
     */
    getTemplate() {
        return `<button class="brand-color-button">${this.api.translate('Brand color')}</button>`
    }

    /**
     * Called after the element's template is rendered in the DOM.
     * Initializes the button element and attaches the click event listener.
     * @param {HTMLElement} container - The container DOM element where the template was rendered.
     */
    onRender(container) {
        this.button = container.querySelector('button');
        this.button.addEventListener('click', this._onClick.bind(this));
    }

    /**
     * Called when the UI element is being destroyed.
     * Removes the click event listener to prevent memory leaks.
     */
    onDestroy() {
        this.button.removeEventListener('click', this._onClick.bind(this));
    }

    /**
     * Handles the click event on the button.
     * Notifies the editor that the value should be changed to the BRAND_COLOR.
     * @private
     */
    _onClick() {
        this.api.onValueChanged(BRAND_COLOR);
    }
}
