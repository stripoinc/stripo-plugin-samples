import {ExtensionBuilder} from "@stripoinc/ui-editor-extensions";
import {BlocksPanelExtension} from "./BlocksPanel";
import styles from './extension-styles.css?raw';

export default new ExtensionBuilder()
  .withBlocksPanel(BlocksPanelExtension)
  .withStyles(styles)
  .withLocalization(  { 'en' : {
      'Modules and structures': 'Modules and structures',
      'Click to open the modules and structures panel.': 'Click to open the modules and structures panel.',
    },
    'uk': {
      'Modules and structures': 'Модулі та структури',
      'Click to open the modules and structures panel.': 'Натисніть, щоб відкрити панель модулів і структур.',
    }})
  .build();
