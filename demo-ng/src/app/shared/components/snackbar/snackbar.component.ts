import { Component } from '@angular/core';
import { isAndroid } from '@nativescript/core';
import { UIService } from '../../../core';

@Component({
	moduleId: module.id,
	selector: 'ns-snackbar',
	templateUrl: './snackbar.component.html',
})
export class SnackbarComponent {
	isAndroid = isAndroid;
	constructor(private uiService: UIService) {}

	close(): void {
		this.uiService.closeSnackbar();
	}
}
