import { ExtensionBuilder } from '@stripoinc/ui-editor-extensions';
import {MyExternalDisplayConditions} from './MyExternalDisplayConditions';

const extension = new ExtensionBuilder()
    .withExternalDisplayCondition(MyExternalDisplayConditions)
    .build();

export default extension;
