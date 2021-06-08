import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptCommonModule } from '@nativescript/angular';

import { SharedModule } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	bootstrap: [AppComponent],
	imports: [NativeScriptModule, NativeScriptCommonModule, AppRoutingModule, SharedModule],
	declarations: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
