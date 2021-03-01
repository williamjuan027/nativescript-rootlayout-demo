import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
    NativeScriptCommonModule,
    NativeScriptFormsModule,
} from "@nativescript/angular";
import { COMPONENTS } from "./components";

@NgModule({
    imports: [NativeScriptCommonModule, NativeScriptFormsModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
