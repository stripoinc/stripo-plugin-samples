import {ExtensionBuilder} from '@stripoinc/ui-editor-extensions';
import {ExternalAiAssistant} from './external-ai-assistant';

export default new ExtensionBuilder()
    .withExternalAiAssistant(ExternalAiAssistant)
    .build();
