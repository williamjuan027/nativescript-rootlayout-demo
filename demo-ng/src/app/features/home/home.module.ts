import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptFormsModule, HomeRoutingModule],
	schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}
