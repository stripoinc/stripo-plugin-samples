/**
 * External AI Assistant
 * This class implements a modal AI text assistant with various text transformation capabilities
 * for the Stripo email editor extension system.
 */
export class ExternalAiAssistant {
  // Instance properties
  externalAiAssistant;
  dataSelectCallback = () => {};
  cancelCallback = () => {};
  originalText = '';

  // UI Style configurations
  static STYLES = {
    // Modal overlay styles
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: '1050',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },

    // Modal container styles
    modal: {
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column'
    },

    // Header styles
    header: {
      padding: '24px 30px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    // Body styles
    body: {
      padding: '30px',
      overflowY: 'auto',
      flex: '1'
    },

    // Footer styles
    footer: {
      padding: '20px 30px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    },

    // Button styles
    suggestionButton: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#495057',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    primaryButton: {
      backgroundColor: '#34c759',
      color: 'white',
      padding: '10px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    cancelButton: {
      backgroundColor: '#f3f4f6',
      color: '#6b7280',
      padding: '10px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  // Text transformation templates
  static TEXT_TRANSFORMATIONS = {
    paragraph: {
      icon: '📝',
      label: 'Generate Paragraph',
      transform: () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    professional: {
      icon: '💼',
      label: 'Make Professional',
      transform: (text) => text ? 
        `Dear valued recipient,\n\nI hope this message finds you well. ${text}\n\nPlease do not hesitate to contact me if you require any further information or clarification.\n\nBest regards` :
        "Dear valued recipient,\n\nI hope this message finds you well. I am writing to bring to your attention a matter of significant importance that requires your immediate consideration.\n\nPlease do not hesitate to contact me if you require any further information or clarification.\n\nBest regards"
    },
    casual: {
      icon: '😊',
      label: 'Make Casual',
      transform: (text) => text ? 
        `Hey there! 👋\n\n${text}\n\nLet me know if you need anything else!\n\nCheers!` :
        "Hey there! 👋\n\nJust wanted to drop you a quick message. Hope everything's going great on your end!\n\nLet me know if you need anything else!\n\nCheers!"
    },
    shorten: {
      icon: '✂️',
      label: 'Shorten Text',
      transform: (text) => text && text.length > 50 ? 
        text.substring(0, Math.min(text.length / 2, 100)) + "..." :
        "Brief and concise message."
    },
    expand: {
      icon: '📏',
      label: 'Expand Text',
      transform: (text) => text ? 
        `${text}\n\nFurthermore, it is important to consider the broader implications of this matter. Additional context and supporting information can provide valuable insights that enhance our understanding of the subject at hand. By examining various perspectives and taking into account all relevant factors, we can arrive at a more comprehensive and well-informed conclusion.` :
        "This is an expanded version of the text with additional details, context, and supporting information. It provides a more comprehensive view of the subject matter, exploring various aspects and implications that might not have been immediately apparent in the original version."
    }
  };

  constructor() {
    this.createModal();
    this.attachEventListeners();
  }

  /**
   * Creates the modal HTML structure and appends it to the document
   */
  createModal() {
    const modalHtml = this.generateModalHTML();
    const container = document.createElement('div');
    container.innerHTML = modalHtml;
    document.body.appendChild(container);

    // Store reference to the modal element
    this.externalAiAssistant = document.getElementById('externalAiAssistant');
    // Initially hide the modal
    this.externalAiAssistant.style.display = 'none';
  }

  /**
   * Generates the complete modal HTML structure
   * @returns {string} HTML string for the modal
   */
  generateModalHTML() {
    return `
      <div id="externalAiAssistant" style="${this.styleObjToString(ExternalAiAssistant.STYLES.overlay)}">
        <div style="${this.styleObjToString(ExternalAiAssistant.STYLES.modal)}">
          ${this.generateHeaderHTML()}
          ${this.generateBodyHTML()}
          ${this.generateFooterHTML()}
        </div>
      </div>
    `;
  }

  /**
   * Generates the header section HTML
   * @returns {string} HTML string for the header
   */
  generateHeaderHTML() {
    return `
      <div style="${this.styleObjToString(ExternalAiAssistant.STYLES.header)}">
        <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 10px;">
          <div style="width: 24px; height: 24px; background-color: #34c759; 
                      border-radius: 6px; display: flex; align-items: center; justify-content: center; 
                      color: white; font-weight: bold; font-size: 14px;">
            AI
          </div>
          AI Text Assistant
        </h2>
        ${this.generateCloseButton()}
      </div>
    `;
  }

  /**
   * Generates close button HTML
   * @returns {string} HTML string for close button
   */
  generateCloseButton() {
    return `
      <button class="close" type="button" 
        style="cursor: pointer; background: transparent; border: none; font-size: 24px; 
               color: #6b7280; padding: 4px; border-radius: 6px; transition: all 0.2s; line-height: 1;"
        onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#1f2937';"
        onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';">
        <span aria-hidden="true">&times;</span>
      </button>
    `;
  }

  /**
   * Generates the body section HTML
   * @returns {string} HTML string for the body
   */
  generateBodyHTML() {
    return `
      <div style="${this.styleObjToString(ExternalAiAssistant.STYLES.body)}">
        ${this.generateOriginalTextSection()}
        ${this.generateActionsSection()}
        ${this.generateTextEditorSection()}
      </div>
    `;
  }

  /**
   * Generates the original text section HTML
   * @returns {string} HTML string for original text section
   */
  generateOriginalTextSection() {
    return `
      <div style="margin-bottom: 24px;">
        <div style="font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; 
                    letter-spacing: 0.5px; margin-bottom: 12px;">
          Original Text
        </div>
        <div id="originalText" style="background-color: #f9fafb; border: 1px solid #e5e7eb; 
                                      border-radius: 8px; padding: 16px; font-size: 14px; 
                                      line-height: 1.6; color: #374151; max-height: 200px; 
                                      overflow-y: auto;">
        </div>
      </div>
    `;
  }

  /**
   * Generates the actions section HTML
   * @returns {string} HTML string for actions section
   */
  generateActionsSection() {
    return `
      <div style="margin-bottom: 24px;">
        <div style="font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; 
                    letter-spacing: 0.5px; margin-bottom: 12px;">
          Quick Actions
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 24px;">
          ${this.generateActionButtons()}
        </div>
      </div>
    `;
  }

  /**
   * Generates action button HTML
   * @returns {string} HTML string for action buttons
   */
  generateActionButtons() {
    return Object.entries(ExternalAiAssistant.TEXT_TRANSFORMATIONS).map(([action, config]) => `
      <button class="suggestion-btn" data-action="${action}"
        style="${this.styleObjToString(ExternalAiAssistant.STYLES.suggestionButton)}"
        onmouseover="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; 
                     this.style.color='white'; this.style.borderColor='transparent'; 
                     this.style.transform='translateY(-2px)'; 
                     this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';"
        onmouseout="this.style.background='linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)'; 
                    this.style.color='#495057'; this.style.borderColor='#dee2e6'; 
                    this.style.transform='translateY(0)'; this.style.boxShadow='none';">
        <span style="font-size: 16px;">${config.icon}</span>
        ${config.label}
      </button>
    `).join('');
  }

  /**
   * Generates the text editor section HTML
   * @returns {string} HTML string for text editor section
   */
  generateTextEditorSection() {
    return `
      <div>
        <div style="font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; 
                    letter-spacing: 0.5px; margin-bottom: 12px;">
          Modified Text
        </div>
        <textarea id="text" placeholder="Your enhanced text will appear here..."
          style="width: 100%; min-height: 200px; padding: 16px; border: 2px solid #e5e7eb; 
                 border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1f2937; 
                 resize: vertical; transition: border-color 0.3s; font-family: inherit;"
          onfocus="this.style.borderColor='#667eea';"
          onblur="this.style.borderColor='#e5e7eb';">
        </textarea>
      </div>
    `;
  }

  /**
   * Generates the footer section HTML
   * @returns {string} HTML string for the footer
   */
  generateFooterHTML() {
    return `
      <div style="${this.styleObjToString(ExternalAiAssistant.STYLES.footer)}">
        <button class="cancelButton" style="${this.styleObjToString(ExternalAiAssistant.STYLES.cancelButton)}"
          onmouseover="this.style.backgroundColor='#e5e7eb'; this.style.color='#4b5563';"
          onmouseout="this.style.backgroundColor='#f3f4f6'; this.style.color='#6b7280';">
          Cancel
        </button>
        <button class="okButton" style="${this.styleObjToString(ExternalAiAssistant.STYLES.primaryButton)}"
          onmouseover="this.style.transform='translateY(-2px)'; 
                       this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
          Apply Changes
        </button>
      </div>
    `;
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
   * Attaches event listeners to modal elements
   */
  attachEventListeners() {
    // Close button click handler
    this.externalAiAssistant.querySelector('.close')
      .addEventListener('click', this.cancelAndClose.bind(this));

    // Cancel button click handler
    this.externalAiAssistant.querySelector('.cancelButton')
      .addEventListener('click', this.cancelAndClose.bind(this));

    // OK button click handler
    this.externalAiAssistant.querySelector('.okButton')
      .addEventListener('click', this.onOkClick.bind(this));

    // Suggestion button click handlers
    const suggestionButtons = this.externalAiAssistant.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleSuggestion(e.currentTarget.dataset.action));
    });
  }

  /**
   * Handles suggestion button clicks
   * @param {string} action - The action to perform
   */
  handleSuggestion(action) {
    const transformation = ExternalAiAssistant.TEXT_TRANSFORMATIONS[action];
    if (!transformation) return;

    const textarea = this.externalAiAssistant.querySelector('#text');
    textarea.value = transformation.transform(this.originalText);
  }

  /**
   * Handles OK button click
   */
  onOkClick() {
    const text = this.externalAiAssistant.querySelector('#text').value.replaceAll('\n', '<br/>');
    this.close();
    this.dataSelectCallback(text);
  }

  /**
   * Closes the modal and executes cancel callback
   */
  cancelAndClose() {
    this.close();
    this.cancelCallback();
  }

  /**
   * Closes the modal by hiding it
   */
  close() {
    this.externalAiAssistant.style.display = 'none';
  }

  /**
   * Opens the AI assistant modal
   * @param {Object} params - Parameters object
   * @param {string} params.value - The text to work with
   * @param {Function} params.onDataSelectCallback - Callback when text is selected
   * @param {Function} params.onCancelCallback - Callback when modal is cancelled
   */
  openAiAssistant({value, onDataSelectCallback, onCancelCallback}) {
    // Store callbacks
    this.dataSelectCallback = onDataSelectCallback;
    this.cancelCallback = onCancelCallback;
    this.originalText = value || '';

    // Display original text
    const originalTextDiv = this.externalAiAssistant.querySelector('#originalText');
    originalTextDiv.textContent = this.originalText || 'No text provided';

    // Set the textarea value
    this.externalAiAssistant.querySelector('#text').value = this.originalText;

    // Show modal
    this.externalAiAssistant.style.display = 'flex';
  }
}
