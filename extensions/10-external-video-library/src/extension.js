import {ExtensionBuilder} from "@stripoinc/ui-editor-extensions";
import {ExternalVideoLibrary} from "./ExternalVideoLibrary";
export default new ExtensionBuilder()
    .withExternalVideosLibrary(ExternalVideoLibrary)
    .build();
