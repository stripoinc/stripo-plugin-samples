import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {initPlugin} from './StripoLoader';
import {MergeTagsTagRegistry, MergeTagsUiElementExtension} from './external-mergetags';


const extension = new ExtensionBuilder()
  .addUiElement(MergeTagsUiElementExtension)
  .withLocalization({
    'en': {
      'Open merge tags': 'Open merge tags',
    },
    'uk': {
      'Open merge tags': 'Відкрити мерж теги',
    }
  })
  .withUiElementTagRegistry(MergeTagsTagRegistry)
  .build();


initPlugin(extension);
