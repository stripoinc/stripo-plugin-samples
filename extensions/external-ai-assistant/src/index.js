import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {initPlugin} from './StripoLoader';
import {ExternalAiAssistant} from './external-ai-assistant';

const extension = new ExtensionBuilder()
  .withExternalAiAssistant(ExternalAiAssistant)
  .build();


initPlugin(extension);
