import {
    ADD_CUSTOM_FONT_OPTION,
    ExtensionBuilder,
    UEAttr,
    UIElement,
    UIElementTagRegistry,
    UIElementType,
} from '@stripoinc/ui-editor-extensions';

const ID = 'custom-font-family-select';
const ORIGINAL_ID = 'original-font-family-select';

class TagRegistry extends UIElementTagRegistry {
    registerUiElements(uiElementsTagsMap) {
        uiElementsTagsMap[ORIGINAL_ID] = uiElementsTagsMap[UIElementType.FONT_FAMILY_SELECT];
        uiElementsTagsMap[UIElementType.FONT_FAMILY_SELECT] = ID;
    }
}

class CustomFontFamilySelect extends UIElement {
    getId() {
        return ID;
    }

    onRender(container) {
        this.listener = this._onChange.bind(this);
        this.originalSelect = container.querySelector('#originalSelect');
        this.originalSelect.addEventListener('change', this.listener);
    }

    onAttributeUpdated(name, value) {
        this.originalSelect.setUIEAttribute(name, value);
        super.onAttributeUpdated(name, value);
    }

    onDestroy() {
        this.originalSelect.removeEventListener('change', this.listener);
    }

    _getDialogTemplate() {
        return `<div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;">
            <div style="
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
                width: 420px;
                max-width: 90vw;
                animation: fadeIn 0.2s ease-out;">
                <div style="
                    padding: 24px;
                    border-bottom: 1px solid #e5e7eb;">
                    <h2 style="
                        margin: 0;
                        font-size: 20px;
                        font-weight: 600;
                        color: #1f2937;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                        Add Custom Font
                    </h2>
                    <p style="
                        margin: 8px 0 0 0;
                        font-size: 14px;
                        color: #6b7280;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                        Configure your custom font settings
                    </p>
                </div>
                <div style="padding: 24px;">
                    <div style="margin-bottom: 20px;">
                        <label style="
                            display: block;
                            margin-bottom: 8px;
                            font-size: 14px;
                            font-weight: 500;
                            color: #374151;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Font Name
                        </label>
                        <input id="name" 
                            placeholder="e.g., My Custom Font"
                            style="
                                width: 100%;
                                padding: 10px 12px;
                                border: 1px solid #d1d5db;
                                border-radius: 6px;
                                font-size: 14px;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                                transition: all 0.2s;
                                box-sizing: border-box;
                                outline: none;"
                            onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                            onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="
                            display: block;
                            margin-bottom: 8px;
                            font-size: 14px;
                            font-weight: 500;
                            color: #374151;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            CSS Font Family
                        </label>
                        <input id="fontFamily" 
                            placeholder="e.g., 'My Font', sans-serif"
                            style="
                                width: 100%;
                                padding: 10px 12px;
                                border: 1px solid #d1d5db;
                                border-radius: 6px;
                                font-size: 14px;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                                transition: all 0.2s;
                                box-sizing: border-box;
                                outline: none;"
                            onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                            onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'">
                    </div>
                    <div style="margin-bottom: 24px;">
                        <label style="
                            display: block;
                            margin-bottom: 8px;
                            font-size: 14px;
                            font-weight: 500;
                            color: #374151;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Font URL
                        </label>
                        <input id="url" 
                            placeholder="e.g., https://fonts.googleapis.com/..."
                            style="
                                width: 100%;
                                padding: 10px 12px;
                                border: 1px solid #d1d5db;
                                border-radius: 6px;
                                font-size: 14px;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                                transition: all 0.2s;
                                box-sizing: border-box;
                                outline: none;"
                            onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                            onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'">
                    </div>
                    <div id="error-message" style="
                        display: none;
                        padding: 12px;
                        background: #fee2e2;
                        border: 1px solid #fecaca;
                        border-radius: 6px;
                        color: #991b1b;
                        font-size: 14px;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        margin-bottom: 20px;">
                        All fields are required. Please fill in all the information.
                    </div>
                    <div style="
                        display: flex;
                        gap: 12px;
                        justify-content: flex-end;">
                        <button 
                            id="cancel"
                            style="
                                padding: 10px 20px;
                                border: 1px solid #d1d5db;
                                border-radius: 6px;
                                background: #ffffff;
                                color: #374151;
                                font-size: 14px;
                                font-weight: 500;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                                cursor: pointer;
                                transition: all 0.2s;">
                            Cancel
                        </button>
                        <button id="confirm" 
                            style="
                                padding: 10px 20px;
                                border: none;
                                border-radius: 6px;
                                background: #34c759;
                                color: #ffffff;
                                font-size: 14px;
                                font-weight: 500;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                                cursor: pointer;
                                transition: all 0.2s;">
                            Add Font
                        </button>
                    </div>
                </div>
                <div style="
                    padding: 16px 24px;
                    border-top: 1px solid #e5e7eb;
                    background-color: #fef3c7;
                    border-radius: 0 0 8px 8px;
                    text-align: center;">
                    <p style="
                        margin: 0;
                        font-size: 13px;
                        color: #92400e;
                        font-weight: 500;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                        <span style="font-weight: 700; color: #d97706;">⚠️ Notice:</span> This popup window is not part of the plugin. It is intended solely for demonstration purposes and can be implemented independently in any desired way.
                    </p>
                </div>
            </div>
        </div>
        <style>
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        </style>`;
    }

    _showDialog() {
        this.dialog = document.createElement('div');
        this.dialog.innerHTML = this._getDialogTemplate();
        this.api.ignoreClickOutside(true);
        document.body.appendChild(this.dialog);
        
        // Add event listeners
        this.dialog.querySelector('#confirm').addEventListener('click', () => this._submitDialog());
        this.dialog.querySelector('#cancel').addEventListener('click', () => this._closeDialog());
        
        // Add input event listeners to hide error message when user starts typing
        const inputs = this.dialog.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const errorMsg = this.dialog.querySelector('#error-message');
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            });
        });
    }

    _submitDialog() {
        const nameInput = this.dialog.querySelector('#name');
        const fontFamilyInput = this.dialog.querySelector('#fontFamily');
        const urlInput = this.dialog.querySelector('#url');
        
        // Reset any previous error states
        [nameInput, fontFamilyInput, urlInput].forEach(input => {
            input.style.borderColor = '#d1d5db';
        });
        
        // Validate inputs
        let hasError = false;
        if (!nameInput.value.trim()) {
            nameInput.style.borderColor = '#ef4444';
            hasError = true;
        }
        if (!fontFamilyInput.value.trim()) {
            fontFamilyInput.style.borderColor = '#ef4444';
            hasError = true;
        }
        if (!urlInput.value.trim()) {
            urlInput.style.borderColor = '#ef4444';
            hasError = true;
        }
        
        if (hasError) {
            // Show error message
            const errorMsg = this.dialog.querySelector('#error-message');
            if (errorMsg) {
                errorMsg.style.display = 'block';
            }
            return;
        }
        
        const newFont = {
            name: nameInput.value.trim(),
            fontFamily: fontFamilyInput.value.trim(),
            url: urlInput.value.trim(),
        }
        this.api.addCustomFont(newFont);
        this._closeDialog();
    }

    _closeDialog() {
        if (this.dialog) {
            this.dialog.remove();
            this.dialog = undefined;
            this.api.ignoreClickOutside(false);
            this.originalSelect.value = '';
        }
    }

    _onChange(event) {
        if (event.target.value !== ADD_CUSTOM_FONT_OPTION) {
            this.api.onValueChanged(event.target.value);
        } else if (!this.dialog) {
            this._showDialog();
        }
    }

    getValue() {
        return this.originalSelect.value;
    }

    setValue(value) {
        this.originalSelect.value = value;
    }

    getTemplate() {
        const attrs = UEAttr.FONT_FAMILY_SELECT;
        return `<${ORIGINAL_ID} id="originalSelect" style="width: 100%;" ${attrs.addCustomFontOption}="+ Insert custom font"></${ORIGINAL_ID}>`;
    }
}

export default new ExtensionBuilder()
    .addUiElement(CustomFontFamilySelect)
    .withUiElementTagRegistry(TagRegistry)
    .build();
