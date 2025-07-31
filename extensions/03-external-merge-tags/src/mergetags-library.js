/**
 * External Merge Tags Library Example
 * This class implements a modal merge tags selector with filtering capabilities
 * for the Stripo email editor extension system.
 */
export class ExternalMergeTagsLibrary {
  // Instance properties
  externalLibrary;
  selectedMergetag = null;
  dataSelectCallback = () => {};
  activeCategory = 'all';

  // UI Style configurations
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
      maxWidth: '900px',
      width: '90%',
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
    
    // Content container styles
    content: {
      padding: '32px',
      height: '315px',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    },
    
    // Grid styles
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '16px'
    },
    
    // Button styles
    buttonActive: {
      padding: '6px 14px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#34c759',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    
    buttonInactive: {
      padding: '6px 14px',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      backgroundColor: 'white',
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    
    // Footer styles
    footer: {
      padding: '16px 32px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#fef3c7',
      borderRadius: '0 0 12px 12px',
      textAlign: 'center'
    }
  };

  // Sample merge tags data
  static MERGE_TAGS = [
    {
      category: 'personal',
      value: '*|FNAME|*',
      label: 'First Name',
      preview: 'John',
      description: 'Recipient\'s first name'
    },
    {
      category: 'personal',
      value: '*|LNAME|*',
      label: 'Last Name',
      preview: 'Doe',
      description: 'Recipient\'s last name'
    },
    {
      category: 'personal',
      value: '*|EMAIL|*',
      label: 'Email Address',
      preview: 'john.doe@example.com',
      description: 'Recipient\'s email address'
    },
    {
      category: 'contact',
      value: '%%Phone%%',
      label: 'Phone Number',
      preview: '+1 (555) 123-4567',
      description: 'Recipient\'s phone number'
    },
    {
      category: 'company',
      value: '{{company}}',
      label: 'Company Name',
      preview: 'Acme Corp',
      description: 'Recipient\'s company'
    },
    {
      category: 'date',
      value: '*|DATE|*',
      label: 'Current Date',
      preview: new Date().toLocaleDateString(),
      description: 'Today\'s date'
    },
    {
      category: 'custom',
      value: '*|CUSTOM_FIELD|*',
      label: 'Custom Field',
      preview: 'Custom Value',
      description: 'Custom merge field'
    }
  ];

  constructor() {
    this.createModal();
    this.attachEventListeners();
    this.initializeFilters();
    this.addStyles();
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
    this.externalLibrary = document.getElementById('externalMergeTags');
    // Initially hide the modal
    this.externalLibrary.style.display = 'none';
  }

  /**
   * Adds custom styles for selected state
   */
  addStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      #externalMergeTags .tag-card.selected {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Generates the complete modal HTML structure
   * @returns {string} HTML string for the modal
   */
  generateModalHTML() {
    return `
      <div id="externalMergeTags" style="${this.styleObjToString(ExternalMergeTagsLibrary.STYLES.overlay)}">
        <div style="${this.styleObjToString(ExternalMergeTagsLibrary.STYLES.modal)}">
          ${this.generateHeaderHTML()}
          ${this.generateContentHTML()}
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
      <div style="${this.styleObjToString(ExternalMergeTagsLibrary.STYLES.header)}">
        <div style="display: flex; align-items: center; gap: 12px;">
          <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827; letter-spacing: -0.025em;">
            Merge Tags
          </h2>
          <div class="filter-buttons" style="display: flex; gap: 8px; margin-left: 24px;">
            ${this.generateFilterButtons()}
          </div>
        </div>
        ${this.generateCloseButton()}
      </div>
    `;
  }

  /**
   * Generates filter button HTML
   * @returns {string} HTML string for filter buttons
   */
  generateFilterButtons() {
    const categories = [
      { id: 'all', label: 'All', active: true },
      { id: 'personal', label: 'Personal', active: false },
      { id: 'contact', label: 'Contact', active: false },
      { id: 'company', label: 'Company', active: false },
      { id: 'date', label: 'Date/Time', active: false },
      { id: 'custom', label: 'Custom', active: false }
    ];

    return categories.map(cat => `
      <button 
        data-category="${cat.id}" 
        style="${this.styleObjToString(cat.active ? ExternalMergeTagsLibrary.STYLES.buttonActive : ExternalMergeTagsLibrary.STYLES.buttonInactive)}">
        ${cat.label}
      </button>
    `).join('');
  }

  /**
   * Generates close button HTML
   * @returns {string} HTML string for close button
   */
  generateCloseButton() {
    return `
      <button class="close" type="button" 
        style="cursor: pointer; background: transparent; border: none; font-size: 24px; 
               color: #6b7280; width: 40px; height: 40px; display: flex; align-items: center; 
               justify-content: center; border-radius: 8px; transition: all 0.2s;"
        onmouseover="this.style.backgroundColor='#f3f4f6'; this.style.color='#111827';"
        onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6b7280';">
        <span style="line-height: 1;">×</span>
      </button>
    `;
  }

  /**
   * Generates the content section HTML with merge tags grid
   * @returns {string} HTML string for content section
   */
  generateContentHTML() {
    return `
      <div style="${this.styleObjToString(ExternalMergeTagsLibrary.STYLES.content)}">
        <div class="tags-grid" style="${this.styleObjToString(ExternalMergeTagsLibrary.STYLES.grid)}">
          ${this.generateMergeTagCards()}
        </div>
      </div>
    `;
  }

  /**
   * Generates the footer section HTML with disclaimer
   * @returns {string} HTML string for the footer
   */
  generateFooterHTML() {
    return `
      <div style="${this.styleObjToString(ExternalMergeTagsLibrary.STYLES.footer)}">
        <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 500;">
          <span style="font-weight: 700; color: #d97706;">⚠️ Notice:</span> This popup window is not part of the plugin. It is intended solely for demonstration purposes and can be implemented independently in any desired way.
        </p>
      </div>
    `;
  }

  /**
   * Generates merge tag card HTML
   * @returns {string} HTML string for all merge tag cards
   */
  generateMergeTagCards() {
    return ExternalMergeTagsLibrary.MERGE_TAGS.map(tag => `
      <div class="tag-card" 
           data-category="${tag.category}"
           data-value="${tag.value}"
           data-label="${tag.label}"
           style="cursor: pointer; border: 2px solid #e5e7eb; border-radius: 8px; 
                  padding: 16px; background-color: #ffffff; transition: all 0.2s;
                  display: flex; flex-direction: column; gap: 8px;"
           onmouseover="if(!this.classList.contains('selected')) { 
                         this.style.borderColor='#d1d5db'; 
                         this.style.transform='translateY(-2px)'; 
                         this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'; 
                       }"
           onmouseout="if(!this.classList.contains('selected')) { 
                        this.style.borderColor='#e5e7eb'; 
                        this.style.transform='translateY(0)'; 
                        this.style.boxShadow='none'; 
                      }">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">
            ${tag.label}
          </h3>
          <span style="font-family: 'Monaco', 'Consolas', monospace; font-size: 12px; 
                       background-color: #f3f4f6; padding: 2px 6px; border-radius: 4px; 
                       color: #6b7280;">
            ${tag.value}
          </span>
        </div>
        <p style="margin: 0; font-size: 14px; color: #6b7280;">
          ${tag.description}
        </p>
        <div style="background-color: #f9fafb; padding: 8px; border-radius: 4px; 
                    margin-top: 4px;">
          <span style="font-size: 12px; color: #9ca3af;">Preview: </span>
          <span style="font-size: 12px; color: #4b5563; font-weight: 500;">
            ${tag.preview}
          </span>
        </div>
      </div>
    `).join('');
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
    this.externalLibrary.querySelector('.close')
      .addEventListener('click', this.cancelAndClose.bind(this));
    
    // Tag card click handler (using event delegation)
    this.externalLibrary.addEventListener('click', this.onTagClick.bind(this));
  }

  /**
   * Initializes filter button functionality
   */
  initializeFilters() {
    const filterButtons = this.externalLibrary.querySelectorAll('.filter-buttons button');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        this.filterTags(category);
        this.updateActiveButton(e.target);
      });
    });
  }

  /**
   * Filters tags based on selected category
   * @param {string} category - Category to filter by
   */
  filterTags(category) {
    this.activeCategory = category;
    const tagCards = this.externalLibrary.querySelectorAll('.tag-card');
    
    tagCards.forEach(card => {
      const shouldShow = category === 'all' || 
                       card.getAttribute('data-category') === category;
      card.style.display = shouldShow ? 'flex' : 'none';
    });
  }

  /**
   * Updates the visual state of filter buttons
   * @param {HTMLElement} activeButton - The button that was clicked
   */
  updateActiveButton(activeButton) {
    const buttons = this.externalLibrary.querySelectorAll('.filter-buttons button');
    
    buttons.forEach(button => {
      const isActive = button === activeButton;
      const styles = isActive ? 
        ExternalMergeTagsLibrary.STYLES.buttonActive : 
        ExternalMergeTagsLibrary.STYLES.buttonInactive;
      
      // Apply styles
      Object.assign(button.style, styles);
    });
  }

  /**
   * Handles click events on tag cards
   * @param {Event} e - Click event
   */
  onTagClick(e) {
    // Check if clicked on tag card or any of its children
    const tagCard = e.target.closest('.tag-card');
    if (!tagCard) return;
    
    // Create callback object with tag data
    const tagData = {
      value: tagCard.getAttribute('data-value'),
      label: tagCard.getAttribute('data-label')
    };
    
    // Close modal and execute callback
    this.close();
    this.dataSelectCallback(tagData);
  }

  /**
   * Updates selected state of tag cards
   */
  updateSelectedTag() {
    // Remove selected class from all cards
    const selectedElement = this.externalLibrary.querySelector('.tag-card.selected');
    if (selectedElement) {
      selectedElement.classList.remove('selected');
      // Reset styles
      selectedElement.style.borderColor = '#e5e7eb';
      selectedElement.style.transform = 'translateY(0)';
      selectedElement.style.boxShadow = 'none';
    }
    
    // Add selected class to current tag
    if (this.selectedMergetag) {
      const currentTag = this.externalLibrary.querySelector(`[data-value="${this.selectedMergetag}"]`);
      if (currentTag) {
        currentTag.classList.add('selected');
      }
    }
  }

  /**
   * Closes the modal and executes cancel callback
   */
  cancelAndClose() {
    this.close();
  }

  /**
   * Closes the modal by hiding it
   */
  close() {
    this.externalLibrary.style.display = 'none';
  }

  /**
   * Opens the merge tags library modal
   * @param {string} mergeTag - Currently selected merge tag value (if any)
   * @param {Function} onDataSelectCallback - Callback when tag is selected
   */
  openMergeTagsLibrary(mergeTag, onDataSelectCallback) {
    // Store callback and selected tag
    this.selectedMergetag = mergeTag;
    this.dataSelectCallback = onDataSelectCallback;
    
    // Update selected state
    this.updateSelectedTag();
    
    // Show modal
    this.externalLibrary.style.display = 'flex';
    
    // Reset filters to show all tags
    this.filterTags('all');
    const allButton = this.externalLibrary.querySelector('[data-category="all"]');
    if (allButton) {
      this.updateActiveButton(allButton);
    }
  }
}
