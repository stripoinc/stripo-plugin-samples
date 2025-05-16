import {UEAttr, UIElementType, Control} from '@stripoinc/ui-editor-extensions';


const MessageStyle = {
  DANGER: 'error',
  SUCCESS: 'success',
  WARNING: 'warn',
  INFO: 'info',
};
export const CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID = 'ui-elements-demo';
const MESSAGE_ELEMENT = 'message';
const TOGGLEABLE_CONTAINER = 'toggleable';
const RADIO_BUTTONS_ELEMENT = 'radioButtons';
const SELECT_ELEMENT = 'select';
const CHECK_BUTTONS_ELEMENT = 'checkButtons';
const CHECKBOX_ELEMENT = 'checkbox';
const SWITCHER_ELEMENT = 'switcher';
const BUTTON_ELEMENT = 'button';
const COLOR_ELEMENT = 'color';
const DATEPICKER_ELEMENT = 'datepicker';
const COUNTER_ELEMENT = 'counter';
const TEXT_ELEMENT = 'text';
const TEXT_AREA_ELEMENT = 'textArea';


/**
 * Demonstrates the usage of various built-in UI elements provided by the Stripo editor extensions API.
 * This control showcases elements like messages, radio buttons, selects, checkboxes, buttons, color pickers, etc.,
 * and handles their interactions.
 */
export class BuildInUIElementsDemoControl extends Control {
  /**
   * Returns the unique identifier for this control.
   * @returns {string} The control's unique ID.
   */
  getId() {
    return CONTROL_BUILD_IN_UI_ELEMENTS_DEMO_ID;
  }

  /**
   * Generates the HTML template for a Label UI element.
   * @private
   * @param {string} text - The text content of the label.
   * @param {string} [name=Math.random()] - The name attribute for the label (defaults to a random string).
   * @returns {string} The HTML string for the label element.
   */
  _getLabel(text, name = `${Math.random()}`) {
    return `<${UIElementType.LABEL} ${UEAttr.LABEL.text}="${text}" ${UEAttr.LABEL.name}="${name}"></${UIElementType.LABEL}>`;
  }

  /**
   * Generates the HTML template for the Message UI element section.
   * @private
   * @returns {string} The HTML string for the message element.
   */
  _getMessage() {
    return `
        <b>Message element allows you to provide user with required information.</b>
        ${this._getLabel('User action:')}
        <${UIElementType.MESSAGE} ${UEAttr.MESSAGE.name}="${MESSAGE_ELEMENT}" ${UEAttr.MESSAGE.type}="${MessageStyle.INFO}"></${UIElementType.MESSAGE}>
    `;
  }

  /**
   * Generates the HTML template for a Radio Item UI element.
   * @private
   * @param {string} text - The text and hint for the radio item.
   * @param {string} value - The value associated with the radio item.
   * @returns {string} The HTML string for the radio item element.
   */
  _getRadioButton(text, value) {
    return `<${UIElementType.RADIO_ITEM} ${UEAttr.RADIO_ITEM.hint}="${text}" ${UEAttr.RADIO_ITEM.text}="${text}" ${UEAttr.RADIO_ITEM.value}="${value}"></${UIElementType.RADIO_ITEM}>`;
  }

  /**
   * Generates the HTML template for the Radio Buttons UI element section.
   * @private
   * @returns {string} The HTML string for the radio buttons element.
   */
  _getRadioButtons() {
    return `
      <b>Radio buttons allow you to choose one item from the list of options.</b>
      ${this._getLabel('Select message style:')}
      <${UIElementType.RADIO_BUTTONS} ${UEAttr.RADIO_BUTTONS.name}="${RADIO_BUTTONS_ELEMENT}">
          ${Object.keys(MessageStyle).map(key => this._getRadioButton(key, MessageStyle[key])).join('')}
      </${UIElementType.RADIO_BUTTONS}>
    `;
  }

  /**
   * Generates the HTML template for a Select Item UI element.
   * @private
   * @param {string} text - The text displayed for the select item.
   * @param {string} value - The value associated with the select item.
   * @returns {string} The HTML string for the select item element.
   */
  _getSelectItem(text, value) {
    return `<${UIElementType.SELECT_ITEM} ${UEAttr.SELECT_ITEM.text}="${text}" ${UEAttr.SELECT_ITEM.value}="${value}"></${UIElementType.SELECT_ITEM}>`;
  }

  /**
   * Generates the HTML template for the Select UI element section.
   * Allows multi-selection.
   * @private
   * @returns {string} The HTML string for the select element.
   */
  _getSelect() {
    return `
      <b>Select element allows you to choose one or several items from the list of options.</b>
        ${this._getLabel('Select message style:')}
        <${UIElementType.SELECTPICKER} ${UEAttr.SELECTPICKER.name}="${SELECT_ELEMENT}" ${UEAttr.SELECTPICKER.multiSelect}="true">
            ${Object.keys(MessageStyle).map(key => this._getSelectItem(key, MessageStyle[key])).join('')}
        </${UIElementType.SELECTPICKER}>
    `;
  }

  /**
   * Generates the HTML template for a Check Item UI element.
   * @param {string} name - The text and hint for the check item.
   * @param {string} value - The value associated with the check item.
   * @returns {string} The HTML string for the check item element.
   */
  getCheckItem(name, value) {
    return `<${UIElementType.CHECK_ITEM} ${UEAttr.CHECK_ITEM.hint}="${name}" ${UEAttr.CHECK_ITEM.text}="${name}" ${UEAttr.CHECK_ITEM.value}="${value}"></${UIElementType.CHECK_ITEM}>`;
  }

  /**
   * Generates the HTML template for the Check Buttons UI element section.
   * @private
   * @returns {string} The HTML string for the check buttons element.
   */
  _getCheckButtons() {
    return `
      <b>CheckButtons are similar to RadioButtons but also allow to select several items.</b>
        ${this._getLabel('Select some items:')}
        <${UIElementType.CHECK_BUTTONS} ${UEAttr.CHECK_BUTTONS.name}="${CHECK_BUTTONS_ELEMENT}">
            ${['one', 'two', 'three'].map(key => this.getCheckItem(key, key)).join('')}
        </${UIElementType.CHECK_BUTTONS}>
    `;
  }

  /**
   * Generates the HTML template for the Checkbox UI element section.
   * @private
   * @returns {string} The HTML string for the checkbox element.
   */
  _getCheckbox() {
    return `
      <b>Checkbox allows you to switch boolean state.</b>
      <${UIElementType.CHECKBOX} ${UEAttr.CHECKBOX.caption}="Disable inputs above:" ${UEAttr.CHECKBOX.name}="${CHECKBOX_ELEMENT}"></${UIElementType.CHECKBOX}>
    `;
  }

  /**
   * Generates the HTML template for the Switcher UI element section.
   * @private
   * @returns {string} The HTML string for the switcher element.
   */
  _getSwitcher() {
    return `
      <b>Switcher allows you to switch boolean state too.</b>
      ${this._getLabel('Display inputs above:')}
      <${UIElementType.SWITCHER} ${UEAttr.SWITCHER.name}="${SWITCHER_ELEMENT}"></${UIElementType.SWITCHER}>
    `;
  }

  /**
   * Generates the HTML template for the Button UI element section.
   * @private
   * @returns {string} The HTML string for the button element.
   */
  _getButton() {
    return `
      <b>Button allows you to perform single action.</b>
      ${this._getLabel('Clear message area:')}
      <${UIElementType.BUTTON} ${UEAttr.BUTTON.name}="${BUTTON_ELEMENT}" ${UEAttr.BUTTON.caption}="DO IT"></${UIElementType.BUTTON}>
    `;
  }

  /**
   * Generates the HTML template for the Color Picker UI element section.
   * @private
   * @returns {string} The HTML string for the color picker element.
   */
  _getColor() {
    return `
      <b>Colorpicker allows you to select color from the default and custom palettes.</b>
      ${this._getLabel('Select color:')}
      <${UIElementType.COLOR} ${UEAttr.COLOR.name}="${COLOR_ELEMENT}"></${UIElementType.COLOR}>
    `;
  }

  /**
   * Generates the HTML template for the Date Picker UI element section.
   * @private
   * @returns {string} The HTML string for the date picker element.
   */
  _getDatepicker() {
    return `
      <b>Datepicker allows to select date.</b>
      ${this._getLabel('Select date:')}
      <${UIElementType.DATEPICKER} ${UEAttr.DATEPICKER.name}="${DATEPICKER_ELEMENT}"></${UIElementType.DATEPICKER}>
    `;
  }

  /**
   * Generates the HTML template for the Counter UI element section.
   * @private
   * @returns {string} The HTML string for the counter element.
   */
  _getCounter() {
    return `
      <b>Counter allows to input numeric value.</b>
      ${this._getLabel('Pick a number between 1 and 10:')}
      <${UIElementType.COUNTER} ${UEAttr.COUNTER.name}="${COUNTER_ELEMENT}" ${UEAttr.COUNTER.minValue}="1" ${UEAttr.COUNTER.maxValue}="10" ${UEAttr.COUNTER.step}="1"></${UIElementType.COUNTER}>
    `;
  }

  /**
   * Generates the HTML template for the Text Input UI element section.
   * @private
   * @returns {string} The HTML string for the text input element.
   */
  _getText() {
    return `
      <b>Text allows you to input string value.</b>
      ${this._getLabel('What is your name?')}
      <${UIElementType.TEXT} ${UEAttr.TEXT.name}="${TEXT_ELEMENT}" ${UEAttr.TEXT.placeholder}="Enter your name here."></${UIElementType.TEXT}>
    `;
  }

  /**
   * Generates the HTML template for the Text Area UI element section.
   * @private
   * @returns {string} The HTML string for the text area element.
   */
  _getTextArea() {
    return `
      <b>Text area allows you to input multi-line text.</b>
      ${this._getLabel('List top 1 of your favourite dinosaurs.', 'dinoLabel')}
      <${UIElementType.TEXTAREA} ${UEAttr.TEXTAREA.name}="${TEXT_AREA_ELEMENT}" ${UEAttr.TEXTAREA.placeholder}="Dinosaurs go here."></${UIElementType.TEXTAREA}>
    `;
  }

  /**
   * Returns the HTML template string that defines the structure of this control.
   * It assembles the various UI element sections generated by helper methods.
   * @returns {string} The HTML template for the control.
   */
  getTemplate() {
    // Note: Using UEAttr.DEFAULT.name here for the toggleable container.
    // This allows controlling its visibility via this.api.setVisibility(TOGGLEABLE_CONTAINER, value).
    return `
    <div class="e2e-elements-container">
        ${this._getMessage()}    
        <hr>
        <div ${UEAttr.DEFAULT.name}="${TOGGLEABLE_CONTAINER}">
          ${this._getRadioButtons()}    
          <hr>
          ${this._getSelect()}        
          <hr>
          ${this._getCheckButtons()}
          <hr>    
          ${this._getButton()}        
          <hr>
          ${this._getCheckbox()}
          <hr>               
        </div>
        ${this._getSwitcher()}      
        <hr>    
        ${this._getColor()}      
        <hr>    
        ${this._getDatepicker()}      
        <hr>    
        ${this._getCounter()}      
        <hr>    
        ${this._getText()}      
        <hr>    
        ${this._getTextArea()}
    </div>
    `;
  }

  /**
   * Called after the control is rendered in the settings panel.
   * Initializes the form values and sets up listeners for value changes on the UI elements.
   */
  onRender() {
    this._setFormValues();
    this._listenToFormUpdates();
  }

  /**
   * Sets the initial values for the UI elements in the control.
   * @private
   */
  _setFormValues() {
    this.api.updateValues({
      [MESSAGE_ELEMENT]: 'Interact with inputs to perform an action.',
      [RADIO_BUTTONS_ELEMENT]: MessageStyle.INFO,
      [SELECT_ELEMENT]: Object.values(MessageStyle),
      [CHECK_BUTTONS_ELEMENT]: {one: true},
      [CHECKBOX_ELEMENT]: false,
      [SWITCHER_ELEMENT]: true,
      [COLOR_ELEMENT]: '#008000',
      [DATEPICKER_ELEMENT]: new Date(),
      [COUNTER_ELEMENT]: 1,
    });
  }

  /**
   * Registers callback functions to be executed when the values of specific UI elements change.
   * @private
   */
  _listenToFormUpdates() {
    this.api.onValueChanged(RADIO_BUTTONS_ELEMENT, value => this._onRadioButtonsChange(value));
    this.api.onValueChanged(SELECT_ELEMENT, value => this._onSelectChange(value));
    this.api.onValueChanged(CHECK_BUTTONS_ELEMENT, value => this._onCheckButtonsChange(value));
    this.api.onValueChanged(BUTTON_ELEMENT, () => this._onButtonClick());
    this.api.onValueChanged(CHECKBOX_ELEMENT, value => this._onCheckboxChange(value));
    this.api.onValueChanged(SWITCHER_ELEMENT, value => this._onSwitcherChange(value));
    this.api.onValueChanged(COLOR_ELEMENT, value => this._onColorChange(value));
    this.api.onValueChanged(DATEPICKER_ELEMENT, value => this._onDateChange(value));
    this.api.onValueChanged(COUNTER_ELEMENT, value => this._onCounterChange(value));
    this.api.onValueChanged(TEXT_ELEMENT, value => this._onTextChange(value));
    this.api.onValueChanged(TEXT_AREA_ELEMENT, value => this._onTextAreaChange(value));
  }

  /**
   * Updates the content of the message UI element.
   * @private
   * @param {string} message - The new message content (HTML allowed).
   * @param {boolean} [overwrite=false] - If true, replaces the existing message; otherwise, appends.
   */
  _updateMessage(message, overwrite = false) {
    const previousMessages = overwrite ? '' : this.api.getValues()[MESSAGE_ELEMENT];
    this.api.updateValues({
      [MESSAGE_ELEMENT]: `${previousMessages ? `${previousMessages}<br>` : ''}${message}`,
    });
  }

  /**
   * Handles changes to the Radio Buttons element.
   * Updates the message type and displays a confirmation message.
   * @private
   * @param {string} value - The selected radio button value.
   */
  _onRadioButtonsChange(value) {
    this.api.setUIEAttribute(MESSAGE_ELEMENT, UEAttr.MESSAGE.type, value);
    this._updateMessage(`<b>Radio item selected</b>: '${value}'`);
  }

  /**
   * Handles changes to the Select element.
   * Updates the available options in the Radio Buttons based on the selection
   * and displays a confirmation message.
   * @private
   * @param {string[]} value - An array of selected values.
   */
  _onSelectChange(value) {
    this.api.setUIEAttribute(
      RADIO_BUTTONS_ELEMENT,
      UEAttr.RADIO_BUTTONS.buttons,
      Object.keys(MessageStyle)
        .filter(key => value.includes(MessageStyle[key]))
        .map(key => ({
          [UEAttr.RADIO_ITEM.hint]: key,
          [UEAttr.RADIO_ITEM.text]: key,
          [UEAttr.RADIO_ITEM.value]: MessageStyle[key],
        })),
    );

    this._updateMessage(`<b>Select items selected</b>: '${value.join(', ')}'`);
  }

  /**
   * Handles changes to the Check Buttons element.
   * Displays a confirmation message showing the selected items.
   * @private
   * @param {Object<string, boolean>} value - An object where keys are item values and values are their checked state.
   */
  _onCheckButtonsChange(value) {
    this._updateMessage(`<b>Check buttons selected</b>: '${JSON.stringify(value).replace(/"/g, '')}'`);
  }

  /**
   * Handles changes to the Checkbox element.
   * Enables/disables other input elements based on the checkbox state and displays a confirmation message.
   * @private
   * @param {boolean} value - The checked state of the checkbox.
   */
  _onCheckboxChange(value) {
    this._updateMessage(`<b>Checkbox changed</b>: '${value}'`);
    this.api.setUIEAttribute(RADIO_BUTTONS_ELEMENT, UEAttr.RADIO_BUTTONS.disabled, value);
    this.api.setUIEAttribute(SELECT_ELEMENT, UEAttr.SELECTPICKER.disabled, value);
    this.api.setUIEAttribute(CHECK_BUTTONS_ELEMENT, UEAttr.CHECK_BUTTONS.disabled, value);
    this.api.setUIEAttribute(BUTTON_ELEMENT, UEAttr.BUTTON.disabled, value);
  }

  /**
   * Handles changes to the Switcher element.
   * Shows/hides a container based on the switcher state and displays a confirmation message.
   * @private
   * @param {boolean} value - The state of the switcher (true for on, false for off).
   */
  _onSwitcherChange(value) {
    this._updateMessage(`<b>Switcher changed</b>: '${value}'`);
    this.api.setVisibility(TOGGLEABLE_CONTAINER, value);
  }

  /**
   * Handles clicks on the Button element.
   * Clears the message area.
   * @private
   */
  _onButtonClick() {
    this._updateMessage(`All gone!`, true);
  }

  /**
   * Handles changes to the Color Picker element.
   * Displays the selected color value in a message.
   * @private
   * @param {string} value - The selected color value (e.g., '#RRGGBB').
   */
  _onColorChange(value) {
    this._updateMessage(`<b>Color selected</b>: '<span style="color: ${value}; background: #FFFFFF; font-weight: bold;">${value}</span>'`);
  }

  /**
   * Handles changes to the Date Picker element.
   * Displays the selected date in a message.
   * @private
   * @param {Date} value - The selected Date object.
   */
  _onDateChange(value) {
    this._updateMessage(`<b>Date selected</b>: '${value.toLocaleDateString()}'`);
  }

  /**
   * Handles changes to the Counter element.
   * Displays the selected number (with some easter eggs) and updates a related label.
   * @private
   * @param {number} value - The current value of the counter.
   */
  _onCounterChange(value) {
    let choice = value;
    if (value === 6) {
      choice = '😱';
    }
    if (value === 9) {
      choice = '';
    }
    this._updateMessage(`<b>You've chosen</b>: '${choice}'`);
    this.api.setUIEAttribute('dinoLabel', UEAttr.LABEL.text, `List top ${value} of your favourite dinosaurs.`);
  }

  /**
   * Handles changes to the Text Input element.
   * Displays a welcome message including the entered name.
   * @private
   * @param {string} value - The text entered in the input field.
   */
  _onTextChange(value) {
    this._updateMessage(`${value}'s come to see us!`);
  }

  /**
   * Handles changes to the Text Area element.
   * Validates the number of lines entered against the value from the counter
   * and displays appropriate messages.
   * @private
   * @param {string} [value=''] - The text entered in the text area.
   */
  _onTextAreaChange(value = '') {
    value = value.trim();
    const requiredNumber = this.api.getValues()[COUNTER_ELEMENT];
    const enteredNumber = value.split('\n').length;
    if (requiredNumber > enteredNumber) {
      this._updateMessage(`<b>Enter ${requiredNumber - enteredNumber} more dinosaurs!</b>`);
    } else if (requiredNumber < enteredNumber) {
      this._updateMessage(`<b>Hold your dinosaurs!</b>`);
    } else {
      this._updateMessage(`<b>Top ${requiredNumber} of dinosaurs:</b><hr>${value.replace(/\n/g, '<br>')}`);
    }
  }

  /**
   * Called when the associated template node is updated.
   * This method is part of the Control lifecycle but is not used in this demo control
   * as it doesn't directly manipulate a specific template node based on its state.
   * @param {ImmutableHtmlNode} node The immutable HTML node representing the element being controlled.
   */
  onTemplateNodeUpdated(node) {
  }
}
