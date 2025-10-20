import {ExternalDisplayConditionsLibrary} from '@stripoinc/ui-editor-extensions';

/**
 * Condition option interface
 */
interface ConditionOption {
    label: string;
    value: string;
}

/**
 * Individual condition interface
 */
interface Condition {
    name: string;
    operation: string;
    value: string;
}

/**
 * Display condition interface passed to callbacks
 */
interface DisplayCondition {
    name: string;
    description: string;
    beforeScript: string;
    afterScript: string;
}

/**
 * Parsed condition result interface
 */
interface ParsedCondition {
    conditions: Condition[];
    concatenation: string;
}

/**
 * Style object type
 */
type StyleObject = Record<string, string>;

/**
 * External Display Conditions Library Implementation
 * Provides UI for creating conditional display rules for email content
 */
export class MyExternalDisplayConditions extends ExternalDisplayConditionsLibrary {
    // Configuration constants
    static readonly AVAILABLE_CONDITION_NAMES: ConditionOption[] = [
        {label: 'Email Address', value: '$EMAIL'},
        {label: 'Phone number', value: '$PHONE'},
    ];

    static readonly AVAILABLE_CONDITION_OPERATIONS: ConditionOption[] = [
        {label: 'Equals (Is)', value: 'equals'},
        {label: 'Contains', value: 'in_array'},
    ];

    static readonly AVAILABLE_CONDITION_CONCATENATIONS: ConditionOption[] = [
        {label: 'all', value: '&&'},
        {label: 'any', value: '||'}
    ];

    static readonly DEFAULT_CONDITION: Condition = {
        name: '$EMAIL',
        operation: 'equals',
        value: ''
    };

    // CSS class names
    static readonly CSS_CLASSES = {
        DROPDOWN_NAME: 'dropdownConditionField',
        DROPDOWN_OPERATION: 'dropdownConditionOperation',
        DROPDOWN_CONCATENATION: 'dropdownConcatenation',
        CONDITION_ROW: 'condition-row',
        CONDITION_VALUE: 'condition-value',
        CONDITIONS_TABLE: 'conditionsTable',
        VALIDATION_ERROR: 'validation-error',
        DELETE_ACTION_PREFIX: 'condition-delete-action-'
    };

    // Validation messages
    static readonly MESSAGES = {
        VALIDATION_ERROR: 'Please enter a value for at least one condition.',
        CONDITION_NAME: 'Conditions applied',
        CONDITION_DESCRIPTION: 'Only users that fit conditions will see this part of the email.'
    };

    // UI Style configurations
    static readonly STYLES: Record<string, StyleObject> = {
        // Modal overlay styles
        overlay: {
            backgroundColor: 'rgba(0,0,0,.7)',
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '1050',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        },

        // Modal container styles
        modal: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            maxWidth: '700px',
            width: '90%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        },

        // Header styles
        header: {
            padding: '24px 32px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f9fafb',
            borderRadius: '12px 12px 0 0'
        },

        // Content styles
        content: {
            padding: '32px',
            overflowY: 'auto',
            flex: '1'
        },

        // Form control styles
        select: {
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            outline: 'none'
        },

        input: {
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            transition: 'border-color 0.2s',
            outline: 'none'
        },

        // Button styles
        buttonPrimary: {
            padding: '8px 20px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#34c759',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
        },

        buttonSecondary: {
            padding: '8px 20px',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            backgroundColor: 'white',
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },

        buttonAdd: {
            padding: '6px 16px',
            borderRadius: '6px',
            border: '1px solid #3b82f6',
            backgroundColor: 'white',
            color: '#3b82f6',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
        }
    };


    // Instance properties
    private selectConditionsCallback: ((condition: DisplayCondition | null) => void) | null = null;
    private conditionsPopupElement: HTMLElement | null = null;
    private onCancelCallback: (() => void) | null = null;

    /**
     * Required method called by the Stripo editor
     * Opens the display conditions modal dialog
     * @param {DisplayCondition|null} currentCondition - Currently applied condition
     * @param {Function} onSelectCallback - Callback invoked when conditions are applied/removed
     * @param {Function} onCancelCallback - Callback invoked when the modal is cancelled
     */
    openExternalDisplayConditionsDialog(
        currentCondition: DisplayCondition | null,
        onSelectCallback: (condition: DisplayCondition | null) => void,
        onCancelCallback: () => void
    ): void {
        // Store callbacks
        this.selectConditionsCallback = onSelectCallback;
        this.onCancelCallback = onCancelCallback;

        // Show modal
        this.activateConditionsPopup(currentCondition);
    }

    /**
     * Gets the category name displayed in the editor UI
     * @returns {string} The category name
     */
    getCategoryName(): string {
        return 'External display conditions';
    }

    /**
     * Determines if the context action should be enabled in the editor
     * @returns {boolean} true if enabled
     */
    getIsContextActionEnabled(): boolean {
        return true;
    }

    /**
     * Gets the index position for the context action in the context menu
     * @returns {number} The index position (1-based)
     */
    getContextActionIndex(): number {
        return 1;
    }

    /**
     * Converts style object to inline style string
     * @param {Object} styleObj - Style object with camelCase properties
     * @returns {string} Inline CSS style string with kebab-case properties
     */
    private styleObjToString(styleObj: StyleObject): string {
        return Object.entries(styleObj)
            .map(([key, value]) => {
                // Convert camelCase to kebab-case
                const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                return `${kebabKey}: ${value}`;
            })
            .join('; ');
    }

    /**
     * Gets the value of a dropdown element
     * @param {HTMLElement} baseElement - The base element to search within
     * @param {string} identifierClass - The CSS class of the dropdown
     * @returns {string|null} The selected value or null if not found
     */
    private getDropdownValue(baseElement: HTMLElement | null, identifierClass: string): string | null {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        if (!baseElement) return null;

        const selectElement = baseElement.querySelector<HTMLSelectElement>('select.' + identifierClass);
        return selectElement ? selectElement.value : null;
    }

    /**
     * Sets the value of a dropdown element
     * @param {HTMLElement} baseElement - The base element to search within
     * @param {string} identifierClass - The CSS class of the dropdown
     * @param {string} value - The value to set
     */
    private setDropdownValue(baseElement: HTMLElement | null, identifierClass: string, value: string): void {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        if (!baseElement) return;

        const selectElement = baseElement.querySelector<HTMLSelectElement>('select.' + identifierClass);
        if (selectElement) {
            selectElement.value = value;
        }
    }

    /**
     * Sets dropdown options and attaches event listeners
     * @param {HTMLElement} baseElement - The base element to search within
     * @param {string} identifierClass - The CSS class of the dropdown
     * @param {Array} options - Array of {label, value} option objects
     */
    private setDropdownOptions(baseElement: HTMLElement | null, identifierClass: string, options: ConditionOption[]): void {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        if (!baseElement) return;

        const selectElement = baseElement.querySelector<HTMLSelectElement>('select.' + identifierClass);
        if (!selectElement) return;

        // Clear existing options
        selectElement.innerHTML = '';

        // Add new options
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.innerHTML = option.label;
            selectElement.appendChild(optionElement);
        });

        // Remove existing event listeners to avoid duplicates
        const newSelectElement = selectElement.cloneNode(true) as HTMLSelectElement;
        selectElement.parentNode?.replaceChild(newSelectElement, selectElement);

        // Add focus/hover styles
        newSelectElement.addEventListener('focus', function() {
            this.style.borderColor = '#3b82f6';
            this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        });

        newSelectElement.addEventListener('blur', function() {
            this.style.borderColor = '#e5e7eb';
            this.style.boxShadow = 'none';
        });

        // Add change event to clear validation error
        newSelectElement.addEventListener('change', () => {
            this.hideValidationError();
        });
    }

    /**
     * Creates dropdown markup
     * @param {string} className - CSS class for the dropdown
     * @returns {string} HTML for the dropdown
     */
    private getDropdownMarkup(className: string): string {
        return `<select style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.select)}" class="${className}"></select>`;
    }

    /**
     * Creates the modal HTML structure and appends it to the document body
     */
    private createConditionsPopup(): void {
        const div = document.createElement('div');
        div.innerHTML = `
        <div id="externalDisplayConditionsPopup"
             style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.overlay)}; visibility: hidden;"
             class="esdev-app">
            <div style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.modal)}">
                ${this.generateHeaderHTML()}
                ${this.generateContentHTML()}
                ${this.generateFooterHTML()}
            </div>
        </div>`;
        document.body.appendChild(div);
        this.conditionsPopupElement = document.getElementById('externalDisplayConditionsPopup');

        // Attach event listeners
        this.attachModalEventListeners();
    }

    /**
     * Generates the modal header section HTML
     * @returns {string} HTML string for the header section
     */
    private generateHeaderHTML(): string {
        return `
        <div style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.header)}">
            <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827; letter-spacing: -0.025em;">
                Display Conditions
            </h2>
            <button id="closePopupButton" type="button"
                    style="cursor: pointer; background: transparent; border: none; font-size: 24px;
                           color: #6b7280; width: 40px; height: 40px; display: flex; align-items: center;
                           justify-content: center; border-radius: 8px; transition: all 0.2s;"
                    onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#111827';"
                    onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';">
                <span style="line-height: 1;">×</span>
            </button>
        </div>
    `;
    }

    /**
     * Generates the modal content section HTML
     * @returns {string} HTML string for the content section
     */
    private generateContentHTML(): string {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;

        return `
        <div style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.content)}">
            <!-- Conditions table -->
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin: 0 0 16px 0;">
                    Condition Rules
                </h3>
                <table class="${CSS.CONDITIONS_TABLE}" style="width: 100%; border-collapse: collapse;"></table>
                <button id="addNewCondition"
                        style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.buttonAdd)}"
                        onmouseover="this.style.backgroundColor='#3b82f6'; this.style.color='white';"
                        onmouseout="this.style.backgroundColor='white'; this.style.color='#3b82f6';">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Add Condition
                </button>
            </div>

            <!-- Concatenation setting -->
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #374151;">
                    Show this content if
                    <span style="display: inline-block; min-width: 80px;">
                        ${this.getDropdownMarkup(CSS.DROPDOWN_CONCATENATION)}
                    </span>
                    conditions are met
                </label>
            </div>

            <!-- Footer actions -->
            <div style="display: flex; align-items: center; justify-content: space-between;
                        padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <a id="removeConditionsPopup"
                   style="color: #ef4444; text-decoration: none; font-size: 14px; cursor: pointer;
                          transition: color 0.2s;"
                   onmouseover="this.style.color='#dc2626';"
                   onmouseout="this.style.color='#ef4444';">
                    Remove all conditions
                </a>
                <div style="display: flex; gap: 12px;">
                    <button id="closeConditionsPopup"
                            style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.buttonSecondary)}"
                            onmouseover="this.style.backgroundColor='#f9fafb';"
                            onmouseout="this.style.backgroundColor='white';">
                        Cancel
                    </button>
                    <button id="applyConditionsAction"
                            style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.buttonPrimary)}"
                            onmouseover="this.style.backgroundColor='#22c55e';"
                            onmouseout="this.style.backgroundColor='#34c759';">
                        Apply Conditions
                    </button>
                </div>
            </div>
        </div>
    `;
    }

    /**
     * Generates the modal footer section HTML with disclaimer notice
     * @returns {string} HTML string for the footer section
     */
    private generateFooterHTML(): string {
        return `
        <div style="padding: 16px 32px; border-top: 1px solid #e5e7eb; background-color: #fef3c7;
                    border-radius: 0 0 12px 12px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 500;">
                <span style="font-weight: 700; color: #d97706;">⚠️ Notice:</span> This popup window is not part of the plugin. It is intended solely for demonstration purposes and can be implemented independently in any desired way.
            </p>
        </div>
    `;
    }

    /**
     * Attaches event listeners to modal elements after creation
     */
    private attachModalEventListeners(): void {
        if (!this.conditionsPopupElement) return;

        this.conditionsPopupElement.querySelector('#closePopupButton')
            ?.addEventListener('click', this.closePopup.bind(this));
        this.conditionsPopupElement.querySelector('#closeConditionsPopup')
            ?.addEventListener('click', this.cancelConditions.bind(this));
        this.conditionsPopupElement.querySelector('#applyConditionsAction')
            ?.addEventListener('click', this.applyConditions.bind(this));
        this.conditionsPopupElement.querySelector('#addNewCondition')
            ?.addEventListener('click', this.addConditionRow.bind(this));
        this.conditionsPopupElement.querySelector('#removeConditionsPopup')
            ?.addEventListener('click', this.removeConditions.bind(this));

        // Set up concatenation dropdown
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;
        this.setDropdownOptions(
            this.conditionsPopupElement,
            CSS.DROPDOWN_CONCATENATION,
            MyExternalDisplayConditions.AVAILABLE_CONDITION_CONCATENATIONS
        );
        this.setDropdownValue(
            this.conditionsPopupElement,
            CSS.DROPDOWN_CONCATENATION,
            MyExternalDisplayConditions.AVAILABLE_CONDITION_CONCATENATIONS[0].value
        );
    }

    /**
     * Creates HTML for a condition row
     * @param {string} deleteActionClass - Unique class for the delete button
     * @returns {string} HTML string for the condition row
     */
    private createConditionRowHTML(deleteActionClass: string): string {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;

        return `
        <td style="padding: 0 8px 16px 0;">
            ${this.getDropdownMarkup(CSS.DROPDOWN_NAME)}
        </td>
        <td style="padding: 0 8px 16px 0;">
            ${this.getDropdownMarkup(CSS.DROPDOWN_OPERATION)}
        </td>
        <td style="padding: 0 8px 16px 0;">
            <input type="text"
                   class="${CSS.CONDITION_VALUE}"
                   style="${this.styleObjToString(MyExternalDisplayConditions.STYLES.input)}"
                   placeholder="Enter value">
        </td>
        <td style="width: 40px; padding-bottom: 16px;">
            <button class="${deleteActionClass}"
                    type="button"
                    data-action="delete"
                    style="background: transparent; border: none; color: #ef4444;
                           cursor: pointer; padding: 8px; border-radius: 6px;
                           transition: all 0.2s; width: 32px; height: 32px;
                           display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>`;
    }

    /**
     * Sets up event listeners for a condition row
     * @param {HTMLElement} row - The row element
     * @param {string} deleteActionClass - Class for the delete button
     */
    private setupConditionRowListeners(row: HTMLElement, deleteActionClass: string): void {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;
        const inputElement = row.querySelector<HTMLInputElement>(`.${CSS.CONDITION_VALUE}`);

        if (inputElement) {
            // Add focus/hover styles to input
            inputElement.addEventListener('focus', function() {
                this.style.borderColor = '#3b82f6';
                this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            });

            inputElement.addEventListener('blur', function() {
                this.style.borderColor = '#e5e7eb';
                this.style.boxShadow = 'none';
            });

            // Clear validation error when user starts typing
            inputElement.addEventListener('input', () => {
                this.hideValidationError();
            });
        }

        // Add delete button listener
        const deleteButton = row.querySelector<HTMLButtonElement>('.' + deleteActionClass);
        if (deleteButton) {
            deleteButton.addEventListener('click', this.deleteConditionRow);
            // Add hover effects
            deleteButton.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#fee2e2';
            });
            deleteButton.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        }
    }

    /**
     * Adds a new condition row to the table
     * @param {Event} e - The event object (can be null)
     * @param {Object} conditionValue - The condition values to populate
     */
    private addConditionRow = (e?: Event | null, conditionValue?: Condition): void => {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;

        if (!conditionValue) {
            conditionValue = MyExternalDisplayConditions.DEFAULT_CONDITION;
        }

        const deleteActionClass = CSS.DELETE_ACTION_PREFIX + Math.random().toString().replace('.', 'd');
        const tr = document.createElement('tr');
        tr.classList.add(CSS.CONDITION_ROW);
        tr.innerHTML = this.createConditionRowHTML(deleteActionClass);

        this.conditionsPopupElement?.querySelector(`.${CSS.CONDITIONS_TABLE}`)?.appendChild(tr);

        // Set dropdown options and values
        this.setDropdownOptions(tr, CSS.DROPDOWN_NAME, MyExternalDisplayConditions.AVAILABLE_CONDITION_NAMES);
        this.setDropdownValue(tr, CSS.DROPDOWN_NAME, conditionValue.name);

        this.setDropdownOptions(tr, CSS.DROPDOWN_OPERATION, MyExternalDisplayConditions.AVAILABLE_CONDITION_OPERATIONS);
        this.setDropdownValue(tr, CSS.DROPDOWN_OPERATION, conditionValue.operation);

        // Set input value
        const inputElement = tr.querySelector<HTMLInputElement>(`.${CSS.CONDITION_VALUE}`);
        if (inputElement) {
            inputElement.value = conditionValue.value;
        }

        // Setup event listeners
        this.setupConditionRowListeners(tr, deleteActionClass);

        this.updateDeleteActionVisibility();
    }

    /**
     * Deletes a condition row
     * @param {Event} e - The click event
     */
    private deleteConditionRow = (e: Event): void => {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;
        const target = e.target as HTMLElement;
        const row = target.closest<HTMLTableRowElement>(`.${CSS.CONDITION_ROW}`);
        if (row) {
            row.remove();
            this.updateDeleteActionVisibility();
        }
    }

    /**
     * Updates visibility of delete buttons based on row count
     */
    private updateDeleteActionVisibility(): void {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;
        const rows = this.conditionsPopupElement?.querySelectorAll<HTMLTableRowElement>(`.${CSS.CONDITIONS_TABLE} .${CSS.CONDITION_ROW}`);
        if (rows && rows.length > 0) {
            const firstDeleteButton = rows[0].querySelector<HTMLButtonElement>('button[class*="condition-delete-action"]');
            if (firstDeleteButton) {
                // Hide delete button for first row if it's the only row
                firstDeleteButton.style.display = rows.length > 1 ? 'flex' : 'none';
            }
        }
    }

    /**
     * Shows a validation error message
     * @param {string} message - The error message to display
     */
    private showValidationError(message: string): void {
        // Remove any existing error message
        this.hideValidationError();

        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.style.cssText = `
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 12px 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

        errorDiv.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink: 0;">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
        <span>${message}</span>
    `;

        // Insert at the beginning of the content area
        const contentDiv = this.conditionsPopupElement?.querySelector('[style*="padding: 32px"]');
        if (contentDiv) {
            contentDiv.insertBefore(errorDiv, contentDiv.firstChild);
        }
    }

    /**
     * Hides the validation error message
     */
    private hideValidationError(): void {
        const existingError = this.conditionsPopupElement?.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
    }

    /**
     * Applies the conditions and closes the modal
     */
    private applyConditions = (): void => {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;
        const MSG = MyExternalDisplayConditions.MESSAGES;
        const conditions: Condition[] = [];
        const rows = this.conditionsPopupElement?.querySelectorAll<HTMLTableRowElement>(`.${CSS.CONDITIONS_TABLE} .${CSS.CONDITION_ROW}`);

        // Collect conditions with non-empty values
        if (rows) {
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const valueInput = row.querySelector<HTMLInputElement>(`.${CSS.CONDITION_VALUE}`);
                const value = valueInput?.value || '';
                if (value.length) {
                    const name = this.getDropdownValue(row, CSS.DROPDOWN_NAME) || '';
                    const operation = this.getDropdownValue(row, CSS.DROPDOWN_OPERATION) || '';
                    conditions.push({
                        name,
                        operation,
                        value
                    });
                }
            }
        }

        // Validation: at least one condition must have a value
        if (conditions.length === 0) {
            this.showValidationError(MSG.VALIDATION_ERROR);
            return;
        }

        // Build the final condition script
        const concatenation = this.getDropdownValue(this.conditionsPopupElement, CSS.DROPDOWN_CONCATENATION) || '&&';
        const finalCondition = conditions.map(condition => {
            return condition.operation + '(\'' + condition.value + '\', ' + condition.name + ')';
        }).join(' ' + concatenation + ' ');

        // Call the success callback
        if (this.selectConditionsCallback) {
            this.selectConditionsCallback({
                name: MSG.CONDITION_NAME,
                description: MSG.CONDITION_DESCRIPTION,
                beforeScript: '%IF ' + finalCondition + '%',
                afterScript: '%/IF%'
            });
        }

        this.closePopup();
    }

    /**
     * Removes all conditions
     */
    private removeConditions = (): void => {
        if (this.selectConditionsCallback) {
            this.selectConditionsCallback(null);
        }
        this.closePopup();
    }

    /**
     * Cancels the modal without applying changes
     */
    private cancelConditions = (): void => {
        if (this.onCancelCallback) {
            this.onCancelCallback();
        }
        this.closePopup();
    }

    /**
     * Closes the modal
     */
    private closePopup = (): void => {
        if (this.conditionsPopupElement) {
            this.conditionsPopupElement.style.visibility = 'hidden';
        }
        this.hideValidationError();
    }

    /**
     * Activates the conditions popup
     * @param {DisplayCondition} appliedCondition - Currently applied condition
     */
    private activateConditionsPopup(appliedCondition: DisplayCondition | null): void {
        if (!this.conditionsPopupElement) {
            this.createConditionsPopup();
        }
        this.initConditions(appliedCondition);
        if (this.conditionsPopupElement) {
            this.conditionsPopupElement.style.visibility = 'visible';
        }
    }

    /**
     * Initializes conditions from applied condition data
     * @param {DisplayCondition} appliedCondition - The applied condition object
     */
    private initConditions(appliedCondition: DisplayCondition | null): void {
        const CSS = MyExternalDisplayConditions.CSS_CLASSES;

        // Clear existing conditions
        const table = this.conditionsPopupElement?.querySelector(`.${CSS.CONDITIONS_TABLE}`);
        if (table) {
            table.innerHTML = '';
        }

        // Parse and add conditions
        const initialConditions = this.parseAppliedCondition(appliedCondition?.beforeScript || '');

        initialConditions.conditions.forEach(condition => {
            this.addConditionRow(null, condition);
        });

        // Set concatenation value
        this.setDropdownValue(this.conditionsPopupElement, CSS.DROPDOWN_CONCATENATION, initialConditions.concatenation);
    }

    /**
     * Parses an applied condition string into its components
     * @param {string} appliedCondition - The condition string
     * @returns {Object} Parsed condition object with conditions array and concatenation
     */
    private parseAppliedCondition(appliedCondition: string): ParsedCondition {
        // Remove wrapper tags
        const str = appliedCondition
            .trim()
            .replace('%IF ', '')
            .replace('%/IF%', '');

        // Find concatenation operator
        const concatenation = this.findConditionOptionValue(
            str,
            MyExternalDisplayConditions.AVAILABLE_CONDITION_CONCATENATIONS
        );

        // Split by concatenation and parse individual conditions
        const conditions = str
            .split(concatenation)
            .map((conditionStr) => {
                // Extract value between quotes
                const valueMatch = conditionStr.match(/'([^']+)'/);
                const value = valueMatch ? valueMatch[1] : '';

                return {
                    name: this.findConditionOptionValue(
                        conditionStr,
                        MyExternalDisplayConditions.AVAILABLE_CONDITION_NAMES
                    ),
                    operation: this.findConditionOptionValue(
                        conditionStr,
                        MyExternalDisplayConditions.AVAILABLE_CONDITION_OPERATIONS
                    ),
                    value
                };
            });

        return {
            conditions,
            concatenation
        };
    }

    /**
     * Finds the value of an option that exists in the given string
     * @param {string} str - The string to search in
     * @param {Array} options - Array of option objects with value property
     * @returns {string} The found option value or first option's value as default
     */
    private findConditionOptionValue(str: string, options: ConditionOption[]): string {
        const foundOption = options.find(option => str.includes(option.value));
        return foundOption ? foundOption.value : options[0].value;
    }
}
