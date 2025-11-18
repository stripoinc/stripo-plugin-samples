/**
 * UI Logic and Rendering for Image Library Tab
 * This class handles all the presentation logic, DOM manipulation,
 * and user interactions for the custom image library tab.
 */
export class ImageLibraryTabUI {
    // UI Style configurations
    static STYLES = {
        // Container styles
        container: {
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif',
        },

        // Header styles
        header: {
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid #e5e7eb',
        },

        // Filter buttons container
        filterContainer: {
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
        },

        // Grid styles
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
            gridAutoRows: '120px',
        },

        // Button styles
        buttonActive: {
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },

        buttonInactive: {
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            backgroundColor: 'white',
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
        },

        // Notice banner styles
        notice: {
            padding: '12px 16px',
            marginBottom: '20px',
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            border: '1px solid #fbbf24',
        },
    };

    // Sample images data
    static IMAGES = [
        {
            category: 'nature',
            src: 'https://demo.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/g05fb9c707080df68b2b7a48884ecfb678ea72bfba6c4b30a3622d77b4e1fc4d686c2fa0ca69ecb08cb93ebe999a2cffd_640.jpeg',
            title: 'Nature Scene',
        },
        {
            category: 'abstract',
            src: 'https://demo.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/g039e37b4b08aab63892fa5bcb069ef5a4c3903ffdfe6a266b65d59c96669e69786dd8db7d6d686af5a93c55b5f59cc21_640.jpeg',
            title: 'Abstract Art',
        },
        {
            category: 'digital',
            src: 'https://demo.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/g865b29f858626ae67bf436c38ea27d23ce34ce2c083b7829929c1ce0f1c7a6f72f2f7654bfe16d837d53df0713b157da_640.jpeg',
            title: 'Digital Design',
        },
        {
            category: 'photography',
            src: 'https://demo.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/gf0fe89ba1310967859765c4634e5fdb5abc15576715a0e8793c2bccdd12fabb435f1f62ebf39c017d6c520c6a0cd0e83_640.jpeg',
            title: 'Mountain Vista',
        },
        {
            category: 'nature',
            src: 'https://rf.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/ge472fe8d47d49d6b4f022364cf352302eff394855af35507d5b92fe30d08e0c8a992246d3d813ff21769fd771fab7c90_640.jpeg',
            title: 'Ocean',
        },
        {
            category: 'nature',
            src: 'https://demo.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/g82fa2ffeb30d400bfa57c908a9716e883b41baf34f6ca09cb0650124ef4f0d10322137d9cfab9ae35aedb1a3d8adfb4e_640.jpeg',
            title: 'Waterfall',
        },
        {
            category: 'digital',
            src: 'https://rf.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/g37c2a939530fa27db0025bc0031514973909782c635b82080f91f5c7c15d473e0b3b7c6d41ef5a20d6370c6f58ae8ff0_640.jpeg',
            title: 'Lunar Rover',
        },
        {
            category: 'photography',
            src: 'https://demo.stripocdn.email/content/guids/CABINET_ec6ac1de70c49219cc55754951562cc72c549fc9e7a7ec9636d3be7a33c392e2/images/gfd3e800e20a1305512a60feb3cdf5fbc07ac64b8397398a9c12e3eb73ae28805d1ed5cbc941f302ab7186feedd38e4ff_640.jpeg',
            title: 'Ocean Sunset',
        },
    ];

    constructor() {
        this.container = null;
        this.imageSelectCallback = () => {
        };
        this.activeCategory = 'all';
    }

    /**
     * Initializes the UI and renders content in the provided container
     * @param {HTMLElement} container - DOM container where content should be rendered
     * @param {Function} onImageSelect - Callback to invoke when an image is selected
     */
    initialize(container, onImageSelect) {
        this.container = container;
        this.imageSelectCallback = onImageSelect;

        this.renderUI();
        this.initializeFilters();
        this.filterImages('all');
    }

    /**
     * Renders the complete UI structure inside the container
     */
    renderUI() {
        const html = this.generateHTML();
        this.container.innerHTML = html;
        this.attachEventListeners();
    }

    /**
     * Generates the complete HTML structure
     * @returns {string} Complete HTML string for the tab content
     */
    generateHTML() {
        return `
    <div style="${this.styleObjToString(ImageLibraryTabUI.STYLES.container)}">
        ${this.generateNoticeHTML()}
        ${this.generateHeaderHTML()}
        ${this.generateFilterButtonsHTML()}
        ${this.generateImageGridHTML()}
    </div>
  `;
    }

    /**
     * Converts a style object to an inline style string
     * @param {Object} styleObj - Style object with camelCase properties
     * @returns {string} Inline CSS style string with kebab-case properties
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
     * Generates notice banner HTML
     * @returns {string} HTML string for the notice banner
     */
    generateNoticeHTML() {
        return `
            <div style="${this.styleObjToString(ImageLibraryTabUI.STYLES.notice)}">
                <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 500;">
                    <span style="font-weight: 700; color: #d97706;">⚠️ Demo Tab:</span> 
                    This is a custom tab integrated into the Stripo image gallery. 
                    It demonstrates how to add your own image sources.
                </p>
            </div>
          `;
    }

    /**
     * Generates the header section HTML
     * @returns {string} HTML string for the header section
     */
    generateHeaderHTML() {
        return `
            <div style="${this.styleObjToString(ImageLibraryTabUI.STYLES.header)}">
                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #111827;">
                    External Image Library
                </h3>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                    Select an image from our custom collection
                </p>
            </div>
          `;
    }

    /**
     * Generates category filter buttons HTML
     * @returns {string} HTML string for filter buttons
     */
    generateFilterButtonsHTML() {
        const categories = [
            {id: 'all', label: 'All', active: true},
            {id: 'nature', label: 'Nature', active: false},
            {id: 'abstract', label: 'Abstract', active: false},
            {id: 'digital', label: 'Digital', active: false},
            {id: 'photography', label: 'Photography', active: false},
        ];

        const buttons = categories.map(cat => `
            <button
                data-category="${cat.id}"
                style="${this.styleObjToString(
            cat.active ?
                ImageLibraryTabUI.STYLES.buttonActive :
                ImageLibraryTabUI.STYLES.buttonInactive
        )}">
                ${cat.label}
            </button>
          `).join('');

        return `
            <div class="filter-buttons" style="${this.styleObjToString(ImageLibraryTabUI.STYLES.filterContainer)}">
                ${buttons}
            </div>
          `;
    }

    /**
     * Generates image grid HTML with thumbnails
     * @returns {string} HTML string for the image grid
     */
    generateImageGridHTML() {
        const thumbnails = ImageLibraryTabUI.IMAGES.map(image => `
    <div class="thumbnail"
         data-category="${image.category}"
         style="cursor: pointer; border-radius: 8px; overflow: hidden;
                background-color: #f9fafb; transition: all 0.3s;
                position: relative; height: 100%; border: 2px solid transparent;"
         onmouseover="this.style.transform='translateY(-2px)';
                     this.style.borderColor='#3b82f6';
                     this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1)';"
         onmouseout="this.style.transform='translateY(0)';
                    this.style.borderColor='transparent';
                    this.style.boxShadow='none';">
        <img style="width: 100%; height: 100%; object-fit: cover; display: block;"
             src="${image.src}"
             alt="${image.title}"
             data-title="${image.title}"
             data-category="${image.category}">
        <div style="position: absolute; bottom: 0; left: 0; right: 0;
                   background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                   padding: 8px; color: white; font-size: 12px; font-weight: 500;">
            ${image.title}
        </div>
    </div>
  `).join('');

        return `
    <div class="image-grid" style="${this.styleObjToString(ImageLibraryTabUI.STYLES.grid)}">
        ${thumbnails}
    </div>
  `;
    }

    /**
     * Attaches event listeners to interactive elements
     */
    attachEventListeners() {
        // Use capture phase to ensure we catch the event before child handlers
        this.container.addEventListener('click', this.onImageClick.bind(this));
    }

    /**
     * Handles click events on image thumbnail cards
     * @param {Event} e - Click event object
     */
    onImageClick(e) {
        const thumbnail = e.target.closest('.thumbnail');
        if (!thumbnail) {
            return;
        }

        const img = thumbnail.querySelector('img');
        if (!img) {
            return;
        }

        const title = img.getAttribute('data-title') || img.getAttribute('alt') || '';
        const category = img.getAttribute('data-category') || '';

        // Create enhanced metadata using labels
        const labels = {
            category: category,
            source: 'External Library Tab',
            title: title,
        };

        // Create callback object with image data and metadata
        const imageData = {
            originalName: img.src.split('/').pop() || '',
            width: 600,
            height: 410,
            sizeBytes: 169000,
            url: img.getAttribute('src') || '',
            altText: title,
            labels: labels,  // Enhanced metadata (v3.2.0+)
        };

        // Invoke the callback to insert the image into the editor
        this.imageSelectCallback(imageData);
    }

    /**
     * Initializes category filter button functionality
     */
    initializeFilters() {
        const filterButtons = this.container.querySelectorAll('.filter-buttons button');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling to image click handler
                const category = e.target.getAttribute('data-category');
                if (category) {
                    this.filterImages(category);
                    this.updateActiveButton(e.target);
                }
            });
        });
    }

    /**
     * Filters displayed images based on the selected category
     * @param {string} category - Category identifier to filter by (or 'all' for all images)
     */
    filterImages(category) {
        this.activeCategory = category;
        const thumbnails = this.container.querySelectorAll('.thumbnail');

        thumbnails.forEach(thumbnail => {
            const shouldShow = category === 'all' ||
                thumbnail.getAttribute('data-category') === category;
            thumbnail.style.display = shouldShow ? 'block' : 'none';
        });
    }

    /**
     * Updates the visual state of category filter buttons
     * @param {HTMLElement} activeButton - The button element that should be marked active
     */
    updateActiveButton(activeButton) {
        const buttons = this.container.querySelectorAll('.filter-buttons button');

        buttons.forEach(button => {
            const isActive = button === activeButton;
            const styles = isActive ?
                ImageLibraryTabUI.STYLES.buttonActive :
                ImageLibraryTabUI.STYLES.buttonInactive;

            // Apply styles
            Object.assign(button.style, styles);
        });
    }
}
