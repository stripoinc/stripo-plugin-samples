import {ExtensionBuilder} from "@stripoinc/ui-editor-extensions";
import {MyExternalVideoLibrary} from "./MyExternalVideoLibrary";

export default new ExtensionBuilder()
    .withExternalVideosLibrary(MyExternalVideoLibrary)
    .build();
