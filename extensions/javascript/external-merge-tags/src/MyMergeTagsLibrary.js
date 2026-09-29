import {ExternalMergeTagsLibrary} from '@stripoinc/ui-editor-extensions';
import {MergeTagsModal} from './MergeTagsModal';

/**
 * External Merge Tags Library Implementation
 * Opens the merge tags modal from the merge tag icons of the editor's input fields:
 * text inputs, links, image paths, the email Subject and the Hidden Preheader.
 */
export class MyMergeTagsLibrary extends ExternalMergeTagsLibrary {
    /**
     * Called by the editor when a user clicks the merge tag icon of an input field
     * @param {string} currentValue - Current value of the whole field
     * @param {Function} onSelectCallback - Inserts the selected merge tag value into the field
     * @param {Function} onCancelCallback - Notifies the editor that the selection was cancelled
     * @param {Object} context - Field information: fieldType ('text' | 'link') and optional fieldName
     */
    openMergeTagsLibrary(currentValue, onSelectCallback, onCancelCallback, context) {
        const isLinkField = context.fieldType === 'link';

        MergeTagsModal.getInstance().open({
            // A merge tag replaces the whole link, so the current value of a link field can match one of the tags
            selectedValue: currentValue,
            // Link fields expect a URL, so open the Links category for them
            category: isLinkField ? 'links' : 'all',
            onSelect: (data) => onSelectCallback(data.value),
            onCancel: onCancelCallback
        });
    }
}
