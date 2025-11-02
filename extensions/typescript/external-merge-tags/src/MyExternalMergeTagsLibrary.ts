/**
 * External Merge Tags Library Implementation
 * This class implements a modal merge tags selector with filtering capabilities
 * for the Stripo Email Editor extension system.
 */

interface StyleObject {
    [key: string]: string;
}

interface MergeTag {
    category: string;
    value: string;
    label: string;
    preview: string;
    description: string;
}

interface MergeTagData {
    value: string;
    label: string;
}

interface CategoryConfig {
    id: string;
    label: string;
    active: boolean;
}

export class MyExternalMergeTagsLibrary {
    // UI Style configurations
    private static readonly STYLES = {
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
    } as const;

    // Sample merge tags data
    private static readonly MERGE_TAGS: MergeTag[] = [
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

    // Instance properties
    private externalLibrary!: HTMLElement;
    private selectedMergetag: string | null = null;
    private dataSelectCallback: (data: MergeTagData) => void = () => {};
    private activeCategory: string = 'all';
    private isModule: boolean = false;

    constructor() {
        this.createModal();
        this.attachEventListeners();
        this.initializeFilters();
        this.addStyles();
    }

    /**
     * Opens the merge tags library modal
     * @param {string} mergeTag - Currently selected merge tag value (if any)
     * @param {boolean} isModule - Whether the merge tag is within a module
     * @param {Function} onDataSelectCallback - Callback invoked when a tag is selected
     */
    openMergeTagsLibrary(mergeTag: string | undefined, isModule: boolean, onDataSelectCallback: (data: MergeTagData) => void): void {
        // Store callback and selected tag
        this.selectedMergetag = mergeTag || null;
        this.isModule = isModule;
        this.dataSelectCallback = onDataSelectCallback;

        // Update module badge visibility
        const moduleBadge = this.externalLibrary.querySelector('.module-badge') as HTMLElement;
        if (moduleBadge) {
            moduleBadge.style.display = this.isModule ? 'inline-block' : 'none';
        }

        // Update selected state
        this.updateSelectedTag();

        // Show modal
        this.externalLibrary.style.display = 'flex';

        // Reset filters to show all tags
        this.filterTags('all');
        const allButton = this.externalLibrary.querySelector('[data-category="all"]') as HTMLElement;
        if (allButton) {
            this.updateActiveButton(allButton);
        }
    }

    /**
     * Creates the modal HTML structure and appends it to the document body
     */
    private createModal(): void {
        const modalHtml = this.generateModalHTML();
        const container = document.createElement('div');
        container.innerHTML = modalHtml;
        document.body.appendChild(container);

        // Store reference to the modal element
        this.externalLibrary = document.getElementById('externalMergeTags') as HTMLElement;
        // Initially hide the modal
        this.externalLibrary.style.display = 'none';
    }

    /**
     * Generates the complete modal HTML structure
     * @returns {string} Complete HTML string for the modal
     */
    private generateModalHTML(): string {
        return `
        <div id="externalMergeTags" style="${this.styleObjToString(MyExternalMergeTagsLibrary.STYLES.overlay)}">
            <div style="${this.styleObjToString(MyExternalMergeTagsLibrary.STYLES.modal)}">
                ${this.generateHeaderHTML()}
                ${this.generateContentHTML()}
                ${this.generateFooterHTML()}
            </div>
        </div>
    `;
    }

    /**
     * Converts a style object to an inline style string
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
     * Adds custom styles for the selected merge tag state
     */
    private addStyles(): void {
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
     * Generates the modal header section HTML
     * @returns {string} HTML string for the header section
     */
    private generateHeaderHTML(): string {
        return `
        <div style="${this.styleObjToString(MyExternalMergeTagsLibrary.STYLES.header)}">
            <div style="display: flex; align-items: center; gap: 12px;">
                <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827; letter-spacing: -0.025em;">
                    Merge Tags
                </h2>
                <span class="module-badge" style="display: none; background-color: #3b82f6; color: white; padding: 4px 12px; border-radius: 6px; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">
                    Module
                </span>
                <div class="filter-buttons" style="display: flex; gap: 8px; margin-left: 24px;">
                    ${this.generateFilterButtons()}
                </div>
            </div>
            ${this.generateCloseButton()}
        </div>
    `;
    }

    /**
     * Generates category filter buttons HTML
     * @returns {string} HTML string for all filter buttons
     */
    private generateFilterButtons(): string {
        const categories: CategoryConfig[] = [
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
            style="${this.styleObjToString(cat.active ? MyExternalMergeTagsLibrary.STYLES.buttonActive : MyExternalMergeTagsLibrary.STYLES.buttonInactive)}">
            ${cat.label}
        </button>
    `).join('');
    }

    /**
     * Generates close button HTML with hover effects
     * @returns {string} HTML string for the close button
     */
    private generateCloseButton(): string {
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
     * Generates the modal content section HTML with merge tags grid
     * @returns {string} HTML string for the content section
     */
    private generateContentHTML(): string {
        return `
        <div style="${this.styleObjToString(MyExternalMergeTagsLibrary.STYLES.content)}">
            <div class="tags-grid" style="${this.styleObjToString(MyExternalMergeTagsLibrary.STYLES.grid)}">
                ${this.generateMergeTagCards()}
            </div>
        </div>
    `;
    }

    /**
     * Generates merge tag card HTML
     * @returns {string} HTML string for all merge tag cards
     */
    private generateMergeTagCards(): string {
        return MyExternalMergeTagsLibrary.MERGE_TAGS.map(tag => `
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
     * Generates the modal footer section HTML with disclaimer notice
     * @returns {string} HTML string for the footer section
     */
    private generateFooterHTML(): string {
        return `
        <div style="${this.styleObjToString(MyExternalMergeTagsLibrary.STYLES.footer)}">
            <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 500;">
                <span style="font-weight: 700; color: #d97706;">⚠️ Notice:</span> This popup window is not part of the plugin. It is intended solely for demonstration purposes and can be implemented independently in any desired way.
            </p>
        </div>
    `;
    }

    /**
     * Attaches event listeners to modal elements after creation
     */
    private attachEventListeners(): void {
        // Close button click handler
        this.externalLibrary.querySelector('.close')!
            .addEventListener('click', this.cancelAndClose.bind(this));

        // Tag card click handler (using event delegation)
        this.externalLibrary.addEventListener('click', this.onTagClick.bind(this));
    }

    /**
     * Handles click events on merge tag cards
     * @param {Event} e - Click event object
     */
    private onTagClick(e: Event): void {
        // Check if clicked on tag card or any of its children
        const tagCard = (e.target as HTMLElement).closest('.tag-card') as HTMLElement;
        if (!tagCard) return;

        // Create callback object with tag data
        const tagData: MergeTagData = {
            value: tagCard.getAttribute('data-value')!,
            label: tagCard.getAttribute('data-label')!
        };

        // Close modal and execute callback
        this.close();
        this.dataSelectCallback(tagData);
    }

    /**
     * Updates the selected state of merge tag cards
     */
    private updateSelectedTag(): void {
        // Remove selected class from all cards
        const selectedElement = this.externalLibrary.querySelector('.tag-card.selected');
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            // Reset styles
            (selectedElement as HTMLElement).style.borderColor = '#e5e7eb';
            (selectedElement as HTMLElement).style.transform = 'translateY(0)';
            (selectedElement as HTMLElement).style.boxShadow = 'none';
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
    private cancelAndClose(): void {
        this.close();
    }

    /**
     * Closes the modal by hiding it from view
     */
    private close(): void {
        this.externalLibrary.style.display = 'none';
    }

    /**
     * Initializes category filter button functionality
     */
    private initializeFilters(): void {
        const filterButtons = this.externalLibrary.querySelectorAll('.filter-buttons button');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = (e.target as HTMLElement).getAttribute('data-category')!;
                this.filterTags(category);
                this.updateActiveButton(e.target as HTMLElement);
            });
        });
    }

    /**
     * Filters displayed merge tags based on the selected category
     * @param {string} category - Category identifier to filter by (or 'all' for all tags)
     */
    private filterTags(category: string): void {
        this.activeCategory = category;
        const tagCards = this.externalLibrary.querySelectorAll('.tag-card');

        tagCards.forEach(card => {
            const shouldShow = category === 'all' ||
                (card as HTMLElement).getAttribute('data-category') === category;
            (card as HTMLElement).style.display = shouldShow ? 'flex' : 'none';
        });
    }

    /**
     * Updates the visual state of category filter buttons
     * @param {HTMLElement} activeButton - The button element that was clicked and should be marked active
     */
    private updateActiveButton(activeButton: HTMLElement): void {
        const buttons = this.externalLibrary.querySelectorAll('.filter-buttons button');

        buttons.forEach(button => {
            const isActive = button === activeButton;
            const styles = isActive ?
                MyExternalMergeTagsLibrary.STYLES.buttonActive :
                MyExternalMergeTagsLibrary.STYLES.buttonInactive;

            // Apply styles
            Object.assign((button as HTMLElement).style, styles);
        });
    }
}
