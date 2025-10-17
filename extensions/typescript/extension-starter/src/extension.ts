import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';

// Create your first extension
const extension = new ExtensionBuilder()
    // Add custom styles to change the blocks panel background
    .addStyles(`
        .block-thumb {
            background-color: #33CC4D
        }
    `)
    .build();

export default extension;
