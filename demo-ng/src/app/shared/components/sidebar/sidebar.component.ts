import { Component } from '@angular/core';
import { UIService } from '../../../core';

@Component({
	moduleId: module.id,
	selector: 'ns-sidebar',
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
	constructor(private uiService: UIService) {}

	openBottomsheet(): void {
		this.uiService.showBottomSheet();
	}

	openCustomModal(): void {
		this.uiService.showCustomModal();
	}

	close(): void {
		this.uiService.closeSidebar();
	}
}
