# External merge tags (TypeScript)

This example already opens one custom popup from the text toolbar and merge-tag icons in supported text and URL fields. URL fields open the Links category. You do not need to implement the input integration yourself.

Use the [setup and upgrade guide](../../javascript/external-merge-tags/README.md). For this TypeScript version, use the corresponding `.ts` files:

- [`src/extension.ts`](src/extension.ts)
- [`src/MyMergeTagsLibrary.ts`](src/MyMergeTagsLibrary.ts)
- [`src/MergeTagsModal.ts`](src/MergeTagsModal.ts)
- [`src/MergeTagsUiElement.ts`](src/MergeTagsUiElement.ts)

Configure your integration in `src/creds.ts`. Run `npm install`, then `npm run dev`. Build for deployment with `npm run build`.

The SDK requirement is already set to `^3.11.0` in `package.json`. When updating an existing application, preserve its credentials, custom tags, and popup appearance, and use an editor runtime supporting ED-9032.
