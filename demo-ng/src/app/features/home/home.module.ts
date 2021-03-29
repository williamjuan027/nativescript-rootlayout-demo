import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptFormsModule, HomeRoutingModule],
	declarations: [HomeComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule {}
