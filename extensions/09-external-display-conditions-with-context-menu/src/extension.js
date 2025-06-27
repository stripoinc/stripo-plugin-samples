import {ExtensionBuilder} from "@stripoinc/ui-editor-extensions";
import {ExternalDisplayConditions} from "./ExternalDisplayConditions";
export default new ExtensionBuilder()
    .withExternalDisplayCondition(ExternalDisplayConditions)
    .build();
