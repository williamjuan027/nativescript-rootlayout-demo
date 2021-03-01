import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { SharedModule } from "./shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, SharedModule],
    declarations: [AppComponent],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
