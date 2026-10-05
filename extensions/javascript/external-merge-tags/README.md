# External merge tags

This ready-to-use example opens one custom popup from the text toolbar and from merge-tag icons in supported text and URL fields. URL fields open the popup's Links category.

The input integration is already implemented. You do not need to write an adapter or add cancellation handling yourself.

## Run the example

1. Use the current files from this directory.
2. Install dependencies with `npm install`.
3. Configure your integration in `src/creds.js` and start it with `npm run dev`.
4. To deploy your version, run `npm run build` and deploy the generated assets.

The example requires SDK `@stripoinc/ui-editor-extensions@3.11.0` or a compatible newer version, and an editor runtime supporting external merge-tag libraries (ED-9032). Its `package.json` already includes the SDK requirement.

## Update an older copy of this example

1. Update the SDK:

   ```sh
   npm install @stripoinc/ui-editor-extensions@3.11.0 --save-exact
   ```

2. Take these ready-made files from the current example:

   - [`src/extension.js`](src/extension.js): registers both the toolbar button and input integration.
   - [`src/MyMergeTagsLibrary.js`](src/MyMergeTagsLibrary.js): connects input icons to the popup.
   - [`src/MergeTagsModal.js`](src/MergeTagsModal.js): shared popup with selection and cancellation callbacks.
   - [`src/MergeTagsUiElement.js`](src/MergeTagsUiElement.js): connects the toolbar button to the same popup.

3. Preserve your credentials and editor initialization. Move your custom tag data and popup styling into `MergeTagsModal.js`; do not overwrite those customizations blindly.
4. Rebuild, deploy, and reload your integration with the updated assets.

If your old copy has `MyExternalMergeTagsLibrary.js`, the updated example replaces it with `MergeTagsModal.js` for the popup and `MyMergeTagsLibrary.js` for the SDK integration.

No additional input configuration flags or `config.mergeTags` list are required. Keep the example's existing editor initialization, including the popup click-outside selector used by the toolbar.

## Customize the popup

Edit your tags, links, and appearance in `src/MergeTagsModal.js`. The toolbar and input icons share this popup, so your changes apply to both.

For a separate special-links selector, update `src/MyMergeTagsLibrary.js`: `context.fieldType === 'link'` identifies URL fields; `'text'` identifies text fields. The current example already uses this context to open the appropriate category.

After updating, check selection and cancellation from the toolbar, a text input, and a URL input. Confirm the selected value is inserted and undo works.

The [TypeScript version](../../typescript/external-merge-tags) provides the same implementation with types.
