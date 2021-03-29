import { Component } from '@angular/core';
import { Page } from '@nativescript/core';
import { UIService, CardService, Character } from '../../core';

@Component({
	moduleId: module.id,
	selector: 'ns-home',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	options = [
		{ displayName: 'Bottom Sheet', preview: '~/assets/images/bottomsheet.png', onTap: () => this.showBottomSheet() },
		{ displayName: 'Mini Bottom Sheet', preview: '~/assets/images/mini-bottomsheet.png', onTap: () => this.showMiniBottomSheet() },
		{ displayName: 'Custom Modal', preview: '~/assets/images/modal.png', onTap: () => this.showCustomModal() },
		{ displayName: 'Snackbar', preview: '~/assets/images/snackbar.png', onTap: () => this.showSnackbar() },
		{ displayName: 'Sidebar', preview: '~/assets/images/sidebar.png', onTap: () => this.showSidebar() },
		{ displayName: 'View Reorder', preview: '~/assets/images/view-reorder.png', onTap: () => this.showRickAndMorty() },
	];

	constructor(private page: Page, private uiService: UIService, private cardService: CardService) {
		this.page.actionBarHidden = true;
	}

	showBottomSheet(): void {
		this.uiService.showBottomSheet();
	}

	showMiniBottomSheet(): void {
		this.uiService.showSecondaryBottomSheet();
	}

	showSnackbar(): void {
		this.uiService.showSnackbar();
	}

	showCustomModal(): void {
		this.uiService.showCustomModal();
	}

	showSidebar(): void {
		// TODO
	}

	showRickAndMorty(): void {
		this.cardService.openCard(Character.rick);
		this.uiService.showBottomSheet(true);
	}
}
