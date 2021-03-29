import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
];

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
	schemas: [NO_ERRORS_SCHEMA],
})
export class HomeRoutingModule {}
