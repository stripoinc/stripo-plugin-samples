import {ExternalGalleryImage, ExternalImageLibraryTab} from '@stripoinc/ui-editor-extensions';

import {ImageLibraryTabUI} from './ImageLibraryTabUI';

/**
 * External Image Library Tab Implementation
 * This class implements the ExternalImageLibraryTab interface
 * and delegates all UI logic to ImageLibraryTabUI
 */

export default class MyExternalImageLibraryTab extends ExternalImageLibraryTab {
  private ui: ImageLibraryTabUI;

  constructor() {
    super();
    this.ui = new ImageLibraryTabUI();
  }

    /**
     * Required method: Returns the localized name of the tab
     * This name will be displayed as the tab title in the gallery
     * @param translate - Translation function provided by Stripo
     * @returns Localized tab name
     */
  public getName(): string {
    return this.api.translate('Custom Images');
  }

    /**
     * Required method: Called when the tab is opened
     * Delegates rendering to the UI class
     * @param container - DOM container where content should be rendered
     * @param onImageSelect - Callback to invoke when an image is selected
     * @param onCancel - Callback to invoke when the user cancels
     */
  public openImageLibraryTab(
    container: HTMLElement,
    onImageSelect: (imageData: ExternalGalleryImage) => void,
  ): void {
    this.ui.initialize(container, onImageSelect);
  }
}
