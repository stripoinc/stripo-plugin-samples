/**
 * External Smart Elements Library Example
 * This class implements a modal product gallery with filtering capabilities
 * for the Stripo email editor extension system.
 */
export class ExternalSmartElementsLibraryExample {
  // Instance properties
  externalLibrary;
  dataSelectCallback = () => {};
  cancelCallback = () => {};
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
      maxWidth: '1000px',
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
      height: '740px',
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    },

    // Grid styles
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '24px'
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
    }
  };

  // Sample smart elements data
  static SMART_ELEMENTS = [
    {
      category: 'electronics',
      p_name: 'Wireless Headphones',
      p_price: '$89.99',
      p_original_price: '$129.99',
      p_image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/gc0859fd762dc386caf67532ca5d9b968b19ba37572e19b72126eb421bee4adfc410dc64eea3dee23cf33c3da5ae06b88_640.jpeg',
      p_rating: 4.5,
      p_discount: '31% OFF'
    },
    {
      category: 'electronics',
      p_name: 'Smart Watch Pro',
      p_price: '$249.00',
      p_original_price: '$299.00',
      p_image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g5b54a78c579f1641216bab7b119c28b0b3dfa50ab44655c45039c8ac164e6d1835ad29ae242af635a8efe74a03f636a0_640.jpeg',
      p_rating: 4.8,
      p_discount: '17% OFF'
    },
    {
      category: 'accessories',
      p_name: 'Premium Leather Case',
      p_price: '$39.99',
      p_original_price: '$59.99',
      p_image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/gc7a4da5fc1d4a3c14ca8964200ede6290826a825cea3dc704d47db7c9938b64c099879d2feeebfb24f3ae749d85736f1_640.png',
      p_rating: 4.2,
      p_discount: '33% OFF'
    },
    {
      category: 'fitness',
      p_name: 'Yoga Mat Pro',
      p_price: '$45.00',
      p_original_price: '$65.00',
      p_image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g3d9ab12046aedd0dd772da9bea9768d5fba2840db28046cf73de1f1bded09ad666ef5788d4812a07ad8cfa531487251f_640.jpeg',
      p_rating: 4.7,
      p_discount: '31% OFF'
    },
    {
      category: 'fitness',
      p_name: 'Resistance Bands Set',
      p_price: '$29.99',
      p_original_price: '$39.99',
      p_image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g939d0a14c9627c0476e3b6cdbee39819532d8823d6e23a3c2e6c651e4466402be0ea7a0384f1cd8e15d04fa52b27fa46_640.jpeg',
      p_rating: 4.6,
      p_discount: '25% OFF'
    },
    {
      category: 'home',
      p_name: 'Smart LED Bulb',
      p_price: '$19.99',
      p_original_price: '$29.99',
      p_image: 'https://rf.stripocdn.email/content/guids/CABINET_6832604a6dbd8f35c4c45dc999af6fe2144259d656ce5a5ea76e6969ed796bbd/images/g2b88c1f3019297a862fe221399e7cc8a69a6e0549a7d280cdbbef815ed22d0c5b9beed9e477ca16497218e9670c152e1_640.jpeg',
      p_rating: 4.4,
      p_discount: '33% OFF'
    }
  ];

  constructor() {
    this.createModal();
    this.attachEventListeners();
    this.initializeFilters();
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
    this.externalLibrary = document.getElementById('externalSmartElementsLibrary');
    // Initially hide the modal
    this.externalLibrary.style.display = 'none';
  }

  /**
   * Generates the complete modal HTML structure
   * @returns {string} HTML string for the modal
   */
  generateModalHTML() {
    return `
      <div id="externalSmartElementsLibrary" style="${this.styleObjToString(ExternalSmartElementsLibraryExample.STYLES.overlay)}">
        <div style="${this.styleObjToString(ExternalSmartElementsLibraryExample.STYLES.modal)}">
          ${this.generateHeaderHTML()}
          ${this.generateContentHTML()}
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
      <div style="${this.styleObjToString(ExternalSmartElementsLibraryExample.STYLES.header)}">
        <div style="display: flex; align-items: center; gap: 12px;">
          <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827; letter-spacing: -0.025em;">
            Smart Elements Library
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
      { id: 'electronics', label: 'Electronics', active: false },
      { id: 'accessories', label: 'Accessories', active: false },
      { id: 'fitness', label: 'Fitness', active: false },
      { id: 'home', label: 'Home', active: false }
    ];

    return categories.map(cat => `
      <button 
        data-category="${cat.id}" 
        style="${this.styleObjToString(cat.active ? ExternalSmartElementsLibraryExample.STYLES.buttonActive : ExternalSmartElementsLibraryExample.STYLES.buttonInactive)}">
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
   * Generates the content section HTML with product grid
   * @returns {string} HTML string for content section
   */
  generateContentHTML() {
    return `
      <div style="${this.styleObjToString(ExternalSmartElementsLibraryExample.STYLES.content)}">
        <div class="elements-grid" style="${this.styleObjToString(ExternalSmartElementsLibraryExample.STYLES.grid)}">
          ${this.generateProductCards()}
        </div>
      </div>
    `;
  }

  /**
   * Generates product card HTML
   * @returns {string} HTML string for all product cards
   */
  generateProductCards() {
    return ExternalSmartElementsLibraryExample.SMART_ELEMENTS.map(element => `
      <div class="product-card" 
           data-category="${element.category}"
           data-name="${element.p_name}"
           data-price="${element.p_price}"
           data-image="${element.p_image}"
           data-original-price="${element.p_original_price}"
           data-rating="${element.p_rating}"
           data-discount="${element.p_discount || ''}"
           style="cursor: pointer; border-radius: 12px; overflow: hidden; 
                  background-color: #ffffff; transition: all 0.3s; 
                  border: 1px solid #e5e7eb; display: flex; flex-direction: column;"
           onmouseover="this.style.transform='translateY(-4px)'; 
                       this.style.boxShadow='0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';"
           onmouseout="this.style.transform='translateY(0)'; 
                      this.style.boxShadow='none';">
        <div style="position: relative; width: 100%; height: 200px; background-color: #f9fafb;">
          <img style="width: 100%; height: 100%; object-fit: contain; padding: 20px;"
               src="${element.p_image}"
               alt="${element.p_name}">
          ${element.p_discount ? `
            <span style="position: absolute; top: 12px; right: 12px; 
                         background-color: #ef4444; color: white; 
                         padding: 4px 8px; border-radius: 6px; 
                         font-size: 12px; font-weight: 600;">
              ${element.p_discount}
            </span>
          ` : ''}
        </div>
        <div style="padding: 16px; flex: 1; display: flex; flex-direction: column;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; 
                     color: #111827; line-height: 1.4;">
            ${element.p_name}
          </h3>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            ${this.generateStarRating(element.p_rating)}
            <span style="font-size: 14px; color: #6b7280;">(${element.p_rating})</span>
          </div>
          <div style="margin-top: auto;">
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 24px; font-weight: 700; color: #111827;">
                ${element.p_price}
              </span>
              <span style="font-size: 16px; color: #9ca3af; text-decoration: line-through;">
                ${element.p_original_price}
              </span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Generates star rating HTML
   * @param {number} rating - Rating value
   * @returns {string} HTML string for star rating
   */
  generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<span style="color: #fbbf24;">★</span>';
    }

    // Half star
    if (hasHalfStar) {
      stars += '<span style="color: #fbbf24;">☆</span>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '<span style="color: #e5e7eb;">★</span>';
    }

    return `<div style="display: flex; gap: 2px; font-size: 14px;">${stars}</div>`;
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

    // Product card click handler (using event delegation)
    this.externalLibrary.addEventListener('click', this.onProductClick.bind(this));
  }

  /**
   * Initializes filter button functionality
   */
  initializeFilters() {
    const filterButtons = this.externalLibrary.querySelectorAll('.filter-buttons button');

    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        this.filterProducts(category);
        this.updateActiveButton(e.target);
      });
    });
  }

  /**
   * Filters products based on selected category
   * @param {string} category - Category to filter by
   */
  filterProducts(category) {
    this.activeCategory = category;
    const productCards = this.externalLibrary.querySelectorAll('.product-card');

    productCards.forEach(card => {
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
          ExternalSmartElementsLibraryExample.STYLES.buttonActive :
          ExternalSmartElementsLibraryExample.STYLES.buttonInactive;

      // Apply styles
      Object.assign(button.style, styles);
    });
  }

  /**
   * Handles click events on product cards
   * @param {Event} e - Click event
   */
  onProductClick(e) {
    // Check if clicked on product card or any of its children
    const productCard = e.target.closest('.product-card');
    if (!productCard) return;

    // Create callback object with product data
    const smartElementData = {
      category: productCard.getAttribute('data-category'),
      p_name: productCard.getAttribute('data-name'),
      p_price: productCard.getAttribute('data-price'),
      p_image: productCard.getAttribute('data-image'),
      p_original_price: productCard.getAttribute('data-original-price'),
      p_rating: parseFloat(productCard.getAttribute('data-rating')),
      p_discount: productCard.getAttribute('data-discount') || null
    };

    // Close modal and execute callback
    this.close();
    this.dataSelectCallback(smartElementData);
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
    this.externalLibrary.style.display = 'none';
  }

  /**
   * Opens the smart elements library modal
   * @param {Function} onDataSelectCallback - Callback when element is selected
   * @param {Function} onCancelCallback - Callback when modal is cancelled
   */
  openSmartElementsLibrary(onDataSelectCallback, onCancelCallback) {
    // Store callbacks
    this.dataSelectCallback = onDataSelectCallback;
    this.cancelCallback = onCancelCallback;

    // Show modal
    this.externalLibrary.style.display = 'flex';

    // Reset filters to show all products
    this.filterProducts('all');
    const allButton = this.externalLibrary.querySelector('[data-category="all"]');
    if (allButton) {
      this.updateActiveButton(allButton);
    }
  }
}
