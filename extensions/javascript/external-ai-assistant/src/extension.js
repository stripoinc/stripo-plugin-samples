import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import {MyExternalAiAssistant} from './MyExternalAiAssistant';

const extension = new ExtensionBuilder()
    .withExternalAiAssistant(MyExternalAiAssistant)
    .build();

export default extension;
