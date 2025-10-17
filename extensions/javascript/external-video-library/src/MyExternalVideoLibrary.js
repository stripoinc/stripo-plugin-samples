import {ExternalVideosLibrary} from '@stripoinc/ui-editor-extensions';
/**
 * External Video Library Example
 * This class implements a modal video gallery with filtering capabilities
 * for the Stripo email editor extension system.
 */
export class MyExternalVideoLibrary extends ExternalVideosLibrary {
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
            height: '289px',
            overflowY: 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box'
        },

        // Grid styles
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            gridAutoRows: '125px'
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

    // Sample videos data
    static VIDEOS = [
        {
            category: 'tutorial',
            src: 'https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/23121555584914821.png',
            title: 'Create Easy & Quick Event Reminder Using Template for Food Industry',
            altText: 'Create Easy & Quick Event Reminder Using Template for Food Industry',
            urlVideo: 'https://www.youtube.com/watch?v=rNmAdmOMp0Y',
            hasButton: true
        },
        {
            category: 'features',
            src: 'https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/1641555585106902.png',
            title: 'How to Get Email Mobile & Browser Preview with Stripo',
            altText: 'How to Get Email Mobile & Browser Preview with Stripo',
            urlVideo: 'https://www.youtube.com/watch?v=R4NXtC3h598',
            hasButton: true
        },
        {
            category: 'overview',
            src: 'https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/1881555585513981',
            title: 'Stripo.email editor',
            altText: 'Stripo.email editor',
            urlVideo: 'https://www.youtube.com/watch?v=ryqOEPk51Lg',
            hasButton: false
        },
        {
            category: 'tutorial',
            src: 'https://psyrh.stripocdn.email/content/guids/videoImgGuid/images/24481555585355917',
            title: 'How to Add Menu in Email with Stripo',
            altText: 'How to Add Menu in Email with Stripo',
            urlVideo: 'https://www.youtube.com/watch?v=XPFWthaa35Q',
            hasButton: false
        }
    ];

    // Instance properties
    externalLibrary;
    videoSelectCallback = () => {};
    cancelCallback = () => {};
    activeCategory = 'all';

    constructor() {
        super();
        this.createModal();
        this.attachEventListeners();
        this.initializeFilters();
    }

    /**
     * Required method called by Stripo editor
     * Opens the video library modal
     * @param {string} currentImage - Currently selected video
     * @param {Function} onVideoSelectCallback - Callback when video is selected
     * @param {Function} onCancelCallback - Callback when modal is cancelled
     */
    openExternalVideosLibraryDialog(currentImageUrl, onVideoSelectCallback, onCancelCallback) {
        // Store callbacks
        this.videoSelectCallback = onVideoSelectCallback;
        this.cancelCallback = onCancelCallback;

        // Show modal
        this.externalLibrary.style.display = 'flex';

        // Reset filters to show all videos
        this.filterVideos('all');
        const allButton = this.externalLibrary.querySelector('[data-category="all"]');
        if (allButton) {
            this.updateActiveButton(allButton);
        }
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
        this.externalLibrary = document.getElementById('externalVideoLibrary');
        // Initially hide the modal
        this.externalLibrary.style.display = 'none';
    }

    /**
     * Generates the complete modal HTML structure
     * @returns {string} HTML string for the modal
     */
    generateModalHTML() {
        return `
        <div id="externalVideoLibrary" style="${this.styleObjToString(MyExternalVideoLibrary.STYLES.overlay)}">
            <div style="${this.styleObjToString(MyExternalVideoLibrary.STYLES.modal)}">
                ${this.generateHeaderHTML()}
                ${this.generateContentHTML()}
                ${this.generateFooterHTML()}
            </div>
        </div>
    `;
    }

    /**
     * Converts style object to inline style string
     * @param {Object} styleObj - Style object with camelCase properties
     * @returns {string} Inline style string with kebab-case properties
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
     * Generates the header section HTML
     * @returns {string} HTML string for the header
     */
    generateHeaderHTML() {
        return `
        <div style="${this.styleObjToString(MyExternalVideoLibrary.STYLES.header)}">
            <div style="display: flex; align-items: center; gap: 12px;">
                <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827; letter-spacing: -0.025em;">
                    Video Library
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
            { id: 'tutorial', label: 'Tutorials', active: false },
            { id: 'features', label: 'Features', active: false },
            { id: 'overview', label: 'Overview', active: false }
        ];

        return categories.map(cat => `
        <button 
            data-category="${cat.id}" 
            style="${this.styleObjToString(cat.active ? MyExternalVideoLibrary.STYLES.buttonActive : MyExternalVideoLibrary.STYLES.buttonInactive)}">
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
     * Generates the content section HTML with video grid
     * @returns {string} HTML string for content section
     */
    generateContentHTML() {
        return `
        <div style="${this.styleObjToString(MyExternalVideoLibrary.STYLES.content)}">
            <div class="video-grid" style="${this.styleObjToString(MyExternalVideoLibrary.STYLES.grid)}">
                ${this.generateVideoThumbnails()}
            </div>
        </div>
    `;
    }

    /**
     * Generates video thumbnail HTML
     * @returns {string} HTML string for all video thumbnails
     */
    generateVideoThumbnails() {
        return MyExternalVideoLibrary.VIDEOS.map(video => `
        <div class="thumbnail" 
             data-category="${video.category}"
             style="cursor: pointer; border-radius: 8px; overflow: hidden; 
                    background-color: #f9fafb; transition: all 0.3s; 
                    position: relative; height: 100%;"
             onmouseover="this.style.transform='translateY(-4px)'; 
                         this.style.boxShadow='0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';"
             onmouseout="this.style.transform='translateY(0)'; 
                        this.style.boxShadow='none';">
            <img style="width: 100%; height: 100%; object-fit: cover; display: block;"
                 src="${video.src}"
                 alt="${video.title}"
                 data-url-video="${video.urlVideo}"
                 data-has-button="${video.hasButton}">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; 
                       background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); 
                       padding: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg style="width: 20px; height: 20px; fill: white;" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <p style="color: white; margin: 0; font-size: 14px; font-weight: 500; 
                              overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${video.title}
                    </p>
                </div>
            </div>
        </div>
    `).join('');
    }

    /**
     * Generates the footer section HTML with disclaimer
     * @returns {string} HTML string for the footer
     */
    generateFooterHTML() {
        return `
        <div style="${this.styleObjToString(MyExternalVideoLibrary.STYLES.footer)}">
            <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 500;">
                <span style="font-weight: 700; color: #d97706;">⚠️ Notice:</span> This popup window is not part of the plugin. It is intended solely for demonstration purposes and can be implemented independently in any desired way.
            </p>
        </div>
    `;
    }

    /**
     * Attaches event listeners to modal elements
     */
    attachEventListeners() {
        // Close button click handler
        this.externalLibrary.querySelector('.close')
            .addEventListener('click', this.cancelAndClose.bind(this));

        // Video click handler (using event delegation)
        this.externalLibrary.addEventListener('click', this.onVideoClick.bind(this));
    }

    /**
     * Handles click events on video thumbnails
     * @param {Event} e - Click event
     */
    onVideoClick(e) {
        // Check if clicked on thumbnail or any of its children
        const thumbnail = e.target.closest('.thumbnail');
        if (!thumbnail) return;

        // Get the image element within the thumbnail
        const img = thumbnail.querySelector('img');
        if (!img) return;

        // Create callback object with video data
        const videoData = {
            originalVideoName: img.getAttribute('alt'),
            originalImageName: img.getAttribute('alt'),
            urlImage: img.getAttribute('src'),
            urlVideo: img.getAttribute('data-url-video'),
            hasCustomButton: img.getAttribute('data-has-button') === 'true',
            altText: img.getAttribute('alt')
        };

        // Close modal and execute callback
        this.close();
        this.videoSelectCallback(videoData);
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
     * Initializes filter button functionality
     */
    initializeFilters() {
        const filterButtons = this.externalLibrary.querySelectorAll('.filter-buttons button');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterVideos(category);
                this.updateActiveButton(e.target);
            });
        });
    }

    /**
     * Filters videos based on selected category
     * @param {string} category - Category to filter by
     */
    filterVideos(category) {
        this.activeCategory = category;
        const thumbnails = this.externalLibrary.querySelectorAll('.thumbnail');

        thumbnails.forEach(thumbnail => {
            const shouldShow = category === 'all' ||
                thumbnail.getAttribute('data-category') === category;
            thumbnail.style.display = shouldShow ? 'block' : 'none';
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
                MyExternalVideoLibrary.STYLES.buttonActive :
                MyExternalVideoLibrary.STYLES.buttonInactive;

            // Apply styles
            Object.assign(button.style, styles);
        });
    }
}
