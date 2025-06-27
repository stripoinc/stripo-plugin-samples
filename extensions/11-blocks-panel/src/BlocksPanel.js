import {BlocksPanel, ExtensionBuilder} from '@stripoinc/ui-editor-extensions';

export class BlocksPanelExtension extends BlocksPanel {
    /**
     * Generates HTML representation for a block item in the blocks panel.
     * This method allows customization of how individual blocks are displayed.
     * 
     * @param {BlockItem} block - The block item containing properties like name, title, iconSrc, description, and disabled
     * @returns {string} HTML string representing the block item
     */
    getBlockItemHtml(block) {
        return `
        <div class="block-thumb" ${block.disabled ? 'disabled' : ''}>
            <ue-icon src="${block.iconSrc}" class="icon-button"></ue-icon>
            <span class="block-thumb-label word-break">${block.title}</span>
            <ue-icon src="reorder" class="rotate90 icon icon-button"></ue-icon>
        </div>`;
    }

    /**
     * Determines whether a hint should be displayed for the specified block.
     * This method controls the visibility of tooltips or help text for blocks.
     * 
     * @param {BlockItem} block - The block item to check
     * @returns {boolean} true if the hint should be visible, false otherwise
     */
    isBlockHintVisible(block) {
        // Example condition to hide hint for BLOCK_IMAGE
        if (block.name === 'BLOCK_IMAGE') {
            return false;
        }
        return true;
    }

    /**
     * Generates HTML representation for the blocks panel header.
     * This method allows customization of the header section of the blocks panel.
     * 
     * @returns {string} HTML string for the blocks panel header
     */
    getBlocksPanelHeaderHtml() {
        return `<div class="blocks-panel-title">
                <h2>Blocks</h2>
            </div>`;
    }

    /**
     * Generates HTML representation for the modules panel in collapsed state.
     * This method customizes how the collapsed modules panel appears to users.
     * 
     * @returns {string} HTML string for the collapsed modules panel
     */
    getModulesPanelCollapsedHtml() {
        if (this.api.getEditorState().panelPosition === 'BLOCKS_SETTINGS') {
            return `<div class="modules-panel-collapsed">
                <span>Structures and modules ${this.api.getEditorState().previewDeviceMode}</span>
                <ue-icon src="chevron-down" class="rotate90 icon icon-button"></ue-icon>
            </div>`;
        } else {
            return `<div class="modules-panel-collapsed">
                <ue-icon src="chevron-down" class="rotate270 icon icon-button"></ue-icon>
                <span>Structures and modules ${this.api.getEditorState().previewDeviceMode}</span>                
            </div>`;
        }
    }

    /**
     * Gets the custom delay for showing hints in milliseconds.
     * This method controls how long users must hover before hints appear.
     * 
     * @returns {number} Delay in milliseconds before hints are shown
     */
    getHintDelay() {
        return 1000;
    }

    /**
     * Determines whether a hint should be displayed for the collapsed modules panel.
     * This method controls the visibility of tooltips for the collapsed modules panel.
     * 
     * @returns {boolean} true if the modules panel collapsed hint should be visible, false otherwise
     */
    isModulesPanelCollapsedHintVisible() {
        return true;
    }

    /**
     * Gets the hint information for the modules panel.
     * This method provides tooltip content for the modules panel.
     * 
     * @returns {BlockHint} Object containing title and description for the modules panel hint
     */
    getModulesPanelHint() {
        return {
            title: this.api.translate('Modules and structures'),
            description: this.api.translate('Click to open the modules and structures panel.'),
        };
    }
}

