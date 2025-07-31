/**
 * @fileoverview External Display Conditions component for Stripo email editor
 * Provides UI for creating conditional display rules for email content
 * @module ExternalDisplayConditions
 */

// Configuration constants
const AVAILABLE_CONDITION_NAMES = [
    {label: 'Email Address', value: '$EMAIL'},
    {label: 'Phone number', value: '$PHONE'},
];

const AVAILABLE_CONDITION_OPERATIONS = [
    {label: 'Equals (Is)', value: 'equals'},
    {label: 'Contains', value: 'in_array'},
];

const AVAILABLE_CONDITION_CONCATENATIONS = [
    {label: 'all', value: '&&'},
    {label: 'any', value: '||'}
];

const DEFAULT_CONDITION = {
    name: AVAILABLE_CONDITION_NAMES[0].value,
    operation: AVAILABLE_CONDITION_OPERATIONS[0].value,
    value: ''
};

// CSS class names
const CSS_CLASSES = {
    DROPDOWN_NAME: 'dropdownConditionField',
    DROPDOWN_OPERATION: 'dropdownConditionOperation',
    DROPDOWN_CONCATENATION: 'dropdownConcatenation',
    CONDITION_ROW: 'condition-row',
    CONDITION_VALUE: 'condition-value',
    CONDITIONS_TABLE: 'conditionsTable',
    VALIDATION_ERROR: 'validation-error',
    DELETE_ACTION_PREFIX: 'condition-delete-action-'
};

// DOM selectors
const SELECTORS = {
    CONTENT_AREA: '[style*="padding: 32px"]',
    DELETE_BUTTON: 'button[class*="condition-delete-action"]',
    POPUP_ID: 'externalDisplayConditionsPopup'
};

// Validation messages
const MESSAGES = {
    VALIDATION_ERROR: 'Please enter a value for at least one condition.',
    CONDITION_NAME: 'Conditions applied',
    CONDITION_DESCRIPTION: 'Only users that fit conditions will see this part of the email.'
};

/**
 * ExternalDisplayConditions class manages the display conditions UI for email content.
 * It provides functionality to create, edit, and apply conditional display rules
 * based on user attributes like email address or phone number.
 * 
 * @class
 * @example
 * const conditions = new ExternalDisplayConditions();
 * conditions.openExternalDisplayConditionsDialog(
 *   currentCondition,
 *   (result) => console.log('Applied:', result),
 *   () => console.log('Cancelled')
 * );
 */
export class ExternalDisplayConditions {
    /**
     * @private
     * @type {Function|null} Callback function to execute when conditions are selected
     */
    selectConditionsCallback = null;
    
    /**
     * @private
     * @type {HTMLElement|null} Reference to the popup DOM element
     */
    conditionsPopupElement = null;
    
    /**
     * @private
     * @type {Function|null} Callback function to execute when dialog is cancelled
     */
    onCancelCallback = null;

    /**
     * UI Style configurations for consistent styling across the component
     * @static
     * @readonly
     */
    static STYLES = {
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

    constructor() {
    }

    /**
     * Converts style object to inline style string
     * @param {Object} styleObj - Style object
     * @returns {string} Inline style string
     */
    styleObjToString(styleObj) {
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
     * @private
     * @param {HTMLElement} baseElement - The base element to search within
     * @param {string} identifierClass - The CSS class of the dropdown
     * @returns {string|null} The selected value or null if not found
     */
    getDropdownValue(baseElement, identifierClass) {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        const selectElement = baseElement.querySelector('select.' + identifierClass);
        return selectElement ? selectElement.value : null;
    }
    
    /**
     * Sets the value of a dropdown element
     * @private
     * @param {HTMLElement} baseElement - The base element to search within
     * @param {string} identifierClass - The CSS class of the dropdown
     * @param {string} value - The value to set
     */
    setDropdownValue(baseElement, identifierClass, value) {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        const selectElement = baseElement.querySelector('select.' + identifierClass);
        if (selectElement) {
            selectElement.value = value;
        }
    }

    setDropdownOptions(baseElement, identifierClass, newValue) {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        const selectElement = baseElement.querySelector('select.' + identifierClass);
        if (!selectElement) return;

        // Clear existing options
        selectElement.innerHTML = '';

        // Add new options
        newValue.forEach(function (option) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.innerHTML = option.label;
            selectElement.appendChild(optionElement);
        });

        // Remove existing event listeners to avoid duplicates
        const newSelectElement = selectElement.cloneNode(true);
        selectElement.parentNode.replaceChild(newSelectElement, selectElement);
        
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

    closePopup() {
        this.conditionsPopupElement.style.visibility = 'hidden';
        this.hideValidationError();
    }

    cancelConditions() {
        this.onCancelCallback();
        this.closePopup();
    }

    showValidationError(message) {
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
        const contentDiv = this.conditionsPopupElement.querySelector('[style*="padding: 32px"]');
        if (contentDiv) {
            contentDiv.insertBefore(errorDiv, contentDiv.firstChild);
        }
    }

    hideValidationError() {
        const existingError = this.conditionsPopupElement.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
    }

    applyConditions() {
        {
            const conditions = [];
            const rows = this.conditionsPopupElement.querySelectorAll(`.${CSS_CLASSES.CONDITIONS_TABLE} .${CSS_CLASSES.CONDITION_ROW}`);

            for (let i=0; i < rows.length; i++) {
                const row = rows[i];
                const value = row.querySelector(`.${CSS_CLASSES.CONDITION_VALUE}`).value;
                if (value.length) {
                    conditions.push({
                        name: this.getDropdownValue(row, CSS_CLASSES.DROPDOWN_NAME),
                        operation: this.getDropdownValue(row, CSS_CLASSES.DROPDOWN_OPERATION),
                        value
                    });
                }
            }

            // Validation: at least one condition must have a value
            if (conditions.length === 0) {
                this.showValidationError(MESSAGES.VALIDATION_ERROR);
                return;
            }

            if (conditions.length) {
                const concatenation = this.getDropdownValue(this.conditionsPopupElement, CSS_CLASSES.DROPDOWN_CONCATENATION);
                const finalCondition = conditions.map(function (condition) {
                    return condition.operation + '(\'' + condition.value + '\', ' + condition.name + ')'
                }).join(' ' + concatenation + ' ');

                this.selectConditionsCallback({
                    name: MESSAGES.CONDITION_NAME,
                    description: MESSAGES.CONDITION_DESCRIPTION,
                    conditionsCount:  conditions.length,
                    beforeScript: '%IF ' + finalCondition + '%',
                    afterScript: '%/IF%'
                });
            }

            this.closePopup();
        }
    }

    /**
     * Creates HTML for a condition row
     * @private
     * @param {string} deleteActionClass - Unique class for the delete button
     * @returns {string} HTML string for the condition row
     */
    createConditionRowHTML(deleteActionClass) {
        return `
            <td style="padding: 0 8px 16px 0;">
                ${this.getDropdownMarkup(CSS_CLASSES.DROPDOWN_NAME)}
            </td>
            <td style="padding: 0 8px 16px 0;">
                ${this.getDropdownMarkup(CSS_CLASSES.DROPDOWN_OPERATION)}
            </td>
            <td style="padding: 0 8px 16px 0;">
                <input type="text" 
                       class="${CSS_CLASSES.CONDITION_VALUE}" 
                       style="${this.styleObjToString(ExternalDisplayConditions.STYLES.input)}"
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
     * @private
     * @param {HTMLElement} row - The row element
     * @param {string} deleteActionClass - Class for the delete button
     */
    setupConditionRowListeners(row, deleteActionClass) {
        const inputElement = row.querySelector(`.${CSS_CLASSES.CONDITION_VALUE}`);
        
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

        // Add delete button listener
        const deleteButton = row.querySelector('.' + deleteActionClass);
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
    addConditionRow(e, conditionValue) {
        if (!conditionValue) {
            conditionValue = DEFAULT_CONDITION;
        }
        
        const deleteActionClass = CSS_CLASSES.DELETE_ACTION_PREFIX + Math.random().toString().replace('.', 'd');
        const tr = document.createElement('tr');
        tr.classList.add(CSS_CLASSES.CONDITION_ROW);
        tr.innerHTML = this.createConditionRowHTML(deleteActionClass);
        
        this.conditionsPopupElement.querySelector(`.${CSS_CLASSES.CONDITIONS_TABLE}`).appendChild(tr);

        // Set dropdown options and values
        this.setDropdownOptions(tr, CSS_CLASSES.DROPDOWN_NAME, AVAILABLE_CONDITION_NAMES);
        this.setDropdownValue(tr, CSS_CLASSES.DROPDOWN_NAME, conditionValue.name);

        this.setDropdownOptions(tr, CSS_CLASSES.DROPDOWN_OPERATION, AVAILABLE_CONDITION_OPERATIONS);
        this.setDropdownValue(tr, CSS_CLASSES.DROPDOWN_OPERATION, conditionValue.operation);

        // Set input value
        const inputElement = tr.querySelector(`.${CSS_CLASSES.CONDITION_VALUE}`);
        inputElement.value = conditionValue.value;

        // Setup event listeners
        this.setupConditionRowListeners(tr, deleteActionClass);
        
        this.updateDeleteActionVisibility();
    }

    removeConditions() {
        this.selectConditionsCallback(null);
        this.closePopup();
    }

    /**
     * Updates visibility of delete buttons based on row count
     * @private
     */
    updateDeleteActionVisibility() {
        const rows = this.conditionsPopupElement.querySelectorAll(`.${CSS_CLASSES.CONDITIONS_TABLE} .${CSS_CLASSES.CONDITION_ROW}`);
        if (rows.length > 0) {
            const firstDeleteButton = rows[0].querySelector(SELECTORS.DELETE_BUTTON);
            if (firstDeleteButton) {
                firstDeleteButton.style.display = rows.length > 1 ? 'flex' : 'none';
            }
        }
    }

    /**
     * Creates dropdown markup
     * @private
     * @param {string} className - CSS class for the dropdown
     * @returns {string} HTML for the dropdown
     */
    getDropdownMarkup(className) {
        return `<select style="${this.styleObjToString(ExternalDisplayConditions.STYLES.select)}" class="${className}"></select>`;
    }

    /**
     * Deletes a condition row
     * @private
     * @param {Event} e - The click event
     */
    deleteConditionRow = (e) => {
        const row = e.target.closest(`.${CSS_CLASSES.CONDITION_ROW}`);
        if (row) {
            row.remove();
            this.updateDeleteActionVisibility();
        }
    }

    openExternalDisplayConditionsDialog(currentCondition, onSelectCallback, onCancelCallback) {
        this.selectConditionsCallback = onSelectCallback;
        this.onCancelCallback = onCancelCallback;
        this.activateConditionsPopup(currentCondition);
    }

    getCategory() {
        return {
            type: 'EXTERNAL',
            category: 'External display conditions', // Category name
            openExternalDisplayConditionsDialog: () => {},
        }
    }

    activateConditionsPopup(appliedCondition) {
        if (!this.conditionsPopupElement) {
            this.createConditionsPopup();
        }
        this.initConditions(appliedCondition);
        this.conditionsPopupElement.style.visibility = 'visible';
    }

    createConditionsPopup() {
        const div = document.createElement('div');
        div.innerHTML = `
            <div id="externalDisplayConditionsPopup" 
                 style="${this.styleObjToString(ExternalDisplayConditions.STYLES.overlay)}; visibility: hidden;" 
                 class="esdev-app">
                <div style="${this.styleObjToString(ExternalDisplayConditions.STYLES.modal)}">
                    <!-- Header -->
                    <div style="${this.styleObjToString(ExternalDisplayConditions.STYLES.header)}">
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
                    
                    <!-- Content -->
                    <div style="${this.styleObjToString(ExternalDisplayConditions.STYLES.content)}">
                        <!-- Conditions table -->
                        <div style="margin-bottom: 24px;">
                            <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin: 0 0 16px 0;">
                                Condition Rules
                            </h3>
                            <table class="conditionsTable" style="width: 100%; border-collapse: collapse;"></table>
                            <button id="addNewCondition" 
                                    style="${this.styleObjToString(ExternalDisplayConditions.STYLES.buttonAdd)}"
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
                                    ${this.getDropdownMarkup(CSS_CLASSES.DROPDOWN_CONCATENATION)}
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
                                        style="${this.styleObjToString(ExternalDisplayConditions.STYLES.buttonSecondary)}"
                                        onmouseover="this.style.backgroundColor='#f9fafb';"
                                        onmouseout="this.style.backgroundColor='white';">
                                    Cancel
                                </button>
                                <button id="applyConditionsAction" 
                                        style="${this.styleObjToString(ExternalDisplayConditions.STYLES.buttonPrimary)}"
                                        onmouseover="this.style.backgroundColor='#22c55e';"
                                        onmouseout="this.style.backgroundColor='#34c759';">
                                    Apply Conditions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(div);
        this.conditionsPopupElement = document.getElementById('externalDisplayConditionsPopup');

        this.conditionsPopupElement.querySelector('#closePopupButton').addEventListener('click', this.closePopup.bind(this));
        this.conditionsPopupElement.querySelector('#closeConditionsPopup').addEventListener('click', this.cancelConditions.bind(this));
        this.conditionsPopupElement.querySelector('#applyConditionsAction').addEventListener('click', this.applyConditions.bind(this));
        this.conditionsPopupElement.querySelector('#addNewCondition').addEventListener('click', this.addConditionRow.bind(this));
        this.conditionsPopupElement.querySelector('#removeConditionsPopup').addEventListener('click', this.removeConditions.bind(this));
        this.setDropdownOptions(this.conditionsPopupElement, CSS_CLASSES.DROPDOWN_CONCATENATION, AVAILABLE_CONDITION_CONCATENATIONS);
        // Set default value for concatenation dropdown
        this.setDropdownValue(this.conditionsPopupElement, CSS_CLASSES.DROPDOWN_CONCATENATION, AVAILABLE_CONDITION_CONCATENATIONS[0].value);
    }

    /**
     * Initializes conditions from applied condition data
     * @private
     * @param {Object} appliedCondition - The applied condition object
     */
    initConditions(appliedCondition) {
        // Clear existing conditions
        const table = this.conditionsPopupElement.querySelector(`.${CSS_CLASSES.CONDITIONS_TABLE}`);
        if (table) {
            table.innerHTML = '';
        }
        
        // Parse and add conditions
        const initialConditions = this.parseAppliedCondition(appliedCondition.beforeScript);
        
        initialConditions.conditions.forEach(condition => {
            this.addConditionRow(null, condition);
        });
        
        // Set concatenation value
        this.setDropdownValue(this.conditionsPopupElement, CSS_CLASSES.DROPDOWN_CONCATENATION, initialConditions.concatenation);
    }

    /**
     * Parses an applied condition string into its components
     * @private
     * @param {string} appliedCondition - The condition string (e.g., "%IF equals('test', $EMAIL)%")
     * @returns {Object} Parsed condition object with conditions array and concatenation
     */
    parseAppliedCondition(appliedCondition) {
        // Remove wrapper tags
        const str = appliedCondition
            .trim()
            .replace('%IF ', '')
            .replace('%/IF%', '');
            
        // Find concatenation operator
        const concatenation = this.findConditionOptionValue(str, AVAILABLE_CONDITION_CONCATENATIONS);
        
        // Split by concatenation and parse individual conditions
        const conditions = str
            .split(concatenation)
            .map((conditionStr) => {
                // Extract value between quotes
                const valueMatch = conditionStr.match(/'([^']+)'/);
                const value = valueMatch ? valueMatch[1] : '';
                
                return {
                    name: this.findConditionOptionValue(conditionStr, AVAILABLE_CONDITION_NAMES),
                    operation: this.findConditionOptionValue(conditionStr, AVAILABLE_CONDITION_OPERATIONS),
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
     * @private
     * @param {string} str - The string to search in
     * @param {Array} options - Array of option objects with value property
     * @returns {string} The found option value or first option's value as default
     */
    findConditionOptionValue(str, options) {
        const foundOption = options.find(option => str.includes(option.value));
        return foundOption ? foundOption.value : options[0].value;
    }

    /**
     * Determines if the context action should be enabled in the editor
     * @returns {boolean} true if the context action should be enabled, false otherwise
     */
    getIsContextActionEnabled() {
        return true;
    }

    /**
     * Gets the index position for the context action in the context menu
     * @returns {number} The index position where the context action should appear (1-based)
     */
    getContextActionIndex() {
        return 1;
    }
}
