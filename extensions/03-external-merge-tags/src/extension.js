import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {MergeTagsTagRegistry, MergeTagsUiElementExtension} from './external-mergetags';


export default new ExtensionBuilder()
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
