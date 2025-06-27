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
const DROPDOWN_CONDITION_NAME_CLASS = 'dropdownConditionField';
const DROPDOWN_CONDITION_OPERATION_CLASS = 'dropdownConditionOperation';
const DROPDOWN_CONDITION_CONCATENATION_CLASS = 'dropdownConcatenation';

export class ExternalDisplayConditions {
    selectConditionsCallback = null;
    conditionsPopupElement = null;

    constructor() {
    }

    getDropdownProps(baseElement, identifierClass) {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        const el = baseElement.querySelector('select.' + identifierClass);
        if (!el.props) {
            el.props = {};
        }
        return el.props;
    }

    setDropdownOptions(baseElement, identifierClass, newValue) {
        if (!baseElement) {
            baseElement = this.conditionsPopupElement;
        }
        const selectElement = baseElement.querySelector('select.' + identifierClass);
        newValue.forEach(function (option) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.innerHTML = option.label;
            selectElement.appendChild(optionElement);
        });
    }

    closePopup() {
        this.conditionsPopupElement.style.visibility = 'hidden';
    }

    cancelConditions() {
        this.onCancelCallback();
        this.closePopup();
    }

    applyConditions() {
        {
            const conditions = [];
            const rows = this.conditionsPopupElement.querySelectorAll('.conditionsTable .condition-row');

            for (let i=0; i < rows.length; i++) {
                const row = rows[i];
                const value = row.querySelector('.condition-value').value;
                if (value.length) {
                    conditions.push({
                        name: this.getDropdownProps(row, DROPDOWN_CONDITION_NAME_CLASS).value,
                        operation: this.getDropdownProps(row, DROPDOWN_CONDITION_OPERATION_CLASS).value,
                        value
                    });
                }
            }

            if (conditions.length) {
                const concatenation = this.getDropdownProps(this.conditionsPopupElement, DROPDOWN_CONDITION_CONCATENATION_CLASS).value;
                const finalCondition = conditions.map(function (condition) {
                    return condition.operation + '(\'' + condition.value + '\', ' + condition.name + ')'
                }).join(' ' + concatenation + ' ');

                this.selectConditionsCallback({
                    name: 'Conditions applied',
                    description: 'Only users that fit conditions will see this part of the email.',
                    conditionsCount:  conditions.length,
                    beforeScript: '%IF ' + finalCondition + '%',
                    afterScript: '%/IF%'
                });
            }

            this.closePopup();
        }
    }

    addConditionRow(e, conditionValue) {
        if (!conditionValue) {
            conditionValue = DEFAULT_CONDITION;
        }
        const deleteActionClass = 'condition-delete-action-' + Math.random().toString().replace('.', 'd');
        const tr = document.createElement('tr');
        tr.classList.add('condition-row');
        tr.innerHTML = '<td style="width: 150px; padding: 0 5px 10px 0;">' + this.getDropdownMarkup(DROPDOWN_CONDITION_NAME_CLASS) + '</td>\
                <td style="width: 110px; padding: 0 5px 10px 0;">' + this.getDropdownMarkup(DROPDOWN_CONDITION_OPERATION_CLASS) + '</td>\
                <td style="padding: 0 5px 10px 0;"><input type="text" class="form-control condition-value"></td>\
                <td style="width: 18px; padding-bottom: 10px;"><span class="es-icon-delete ' + deleteActionClass + '"></span></td>';
        this.conditionsPopupElement.querySelector('.conditionsTable').appendChild(tr);

        const nameProps = this.getDropdownProps(tr, DROPDOWN_CONDITION_NAME_CLASS);
        this.setDropdownOptions(tr, DROPDOWN_CONDITION_NAME_CLASS, AVAILABLE_CONDITION_NAMES);
        nameProps.value = conditionValue.name;

        const operationProps = this.getDropdownProps(tr, DROPDOWN_CONDITION_OPERATION_CLASS);
        this.setDropdownOptions(tr, DROPDOWN_CONDITION_OPERATION_CLASS, AVAILABLE_CONDITION_OPERATIONS);
        operationProps.value = conditionValue.operation;

        tr.querySelector('.condition-value').value = conditionValue.value;

        this.conditionsPopupElement.querySelector('.' + deleteActionClass).addEventListener('click', this.deleteConditionRow);
        this.updateDeleteActionVisibility();
    }

    removeConditions() {
        this.selectConditionsCallback(null);
        this.closePopup();
    }

    updateDeleteActionVisibility() {
        const rows = this.conditionsPopupElement.querySelectorAll('.conditionsTable .condition-row');
        rows[0].querySelector('.es-icon-delete').style.display = rows.length > 1 ? 'block' : 'none';
    }

    getDropdownMarkup(className) {
        return `<select style="padding: 0" class="${className}"></select>`;
    }

    deleteConditionRow(e) {
        e.target.closest('.condition-row').remove();
        this.updateDeleteActionVisibility();
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

    getIsContextActionEnabled() {
        return false;
    }

    getContextActionIndex() {
        return -1;
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
        div.innerHTML = `<div id="externalDisplayConditionsPopup" style="background-color: rgba(0,0,0,.5); overflow: hidden; 
                    position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif; visibility: hidden;" 
                    class="esdev-app">
                <div style="margin: 10px;">
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 800px; margin: 0 auto;">
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">
                        <div>
                           <button id="closePopupButton" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">
                                <span>×</span>
                            </button>
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Display conditions</h4>
                        </div>
                    </div>
                    <div style="padding: 15px;">
                        <table class="conditionsTable" style="border-collapse: collapse" width="100%"></table>
                        <button id="addNewCondition" class="btn btn-primary btn-sm">Add Condition</button>
                        <div style="margin-top: 20px;">
                            Show this content if
                            <span style="width: 65px;display: inline-block;">
                                ${this.getDropdownMarkup(DROPDOWN_CONDITION_CONCATENATION_CLASS)}
                            </span>
                            conditions are met.
                        </div>
                        <div>
                            <table style="width: 100%; margin-top: 20px;">
                                <tr>
                                    <td>
                                        <a id="removeConditionsPopup" target="_blank">Remove all conditions and close modal</a>
                                    </td>
                                    <td width="80px">
                                        <button id="closeConditionsPopup" class="btn btn-secondary">Cancel</button>
                                    </td>
                                    <td width="45px">
                                        <button id="applyConditionsAction" class="btn btn-success">Ok</button>
                                    </td>
                                </tr>
                            </table>
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
        this.setDropdownOptions(this.conditionsPopupElement, DROPDOWN_CONDITION_CONCATENATION_CLASS, AVAILABLE_CONDITION_CONCATENATIONS);
        this.getDropdownProps(this.conditionsPopupElement, DROPDOWN_CONDITION_CONCATENATION_CLASS).values = AVAILABLE_CONDITION_CONCATENATIONS;
    }

    initConditions(appliedCondition) {
        this.conditionsPopupElement.querySelector('.conditionsTable').innerHTML = '';
        const initialConditions = this.parseAppliedCondition(appliedCondition.beforeScript);

        for (let i=0; i<initialConditions.conditions.length; i++) {
            this.addConditionRow(null, initialConditions.conditions[i]);
        }

        this.getDropdownProps(this.conditionsPopupElement, DROPDOWN_CONDITION_CONCATENATION_CLASS).value = initialConditions.concatenation;
    }

    parseAppliedCondition(appliedCondition) {
        const str = appliedCondition
            .trim()
            .replace('%IF ', '')
            .replace('%/IF%', '');
        const concatenation = this.findConditionOptionValue(str, AVAILABLE_CONDITION_CONCATENATIONS);
        const conditions = str
            .split(concatenation)
            .map((str) => {
                return {
                    name: this.findConditionOptionValue(str, AVAILABLE_CONDITION_NAMES),
                    operation: this.findConditionOptionValue(str, AVAILABLE_CONDITION_OPERATIONS),
                    value: str.substring(str.indexOf('\'') + 1, str.lastIndexOf('\''))
                }
            });
        return {
            conditions,
            concatenation
        };
    }

    findConditionOptionValue(str, options) {
        let option = options.find(function(i) {
            return str.indexOf(i.value) > -1;
        });
        if (!option) {
            option = options[0];
        }
        return option.value;
    }
}