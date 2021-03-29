import { Component } from '@angular/core';
import { isAndroid } from '@nativescript/core';
import { CardService, UIService } from '../../../core';

@Component({
	moduleId: module.id,
	selector: 'ns-card-bottomsheet',
	templateUrl: './card-bottomsheet.component.html',
})
export class CardBottomsheetComponent {
	isAndroid = isAndroid;
	options;
	constructor(private uiService: UIService, public cardService: CardService) {
		this.options = Object.keys(this.cardService.characters);
		console.log('options:', this.options);
		console.log('options[0]:', this.options[0]);
	}

	viewCard(character) {
		this.cardService.bringCardToFront(character);
		setTimeout(() => {
			this.uiService.bringBottomSheetToFront();
		}, 400);
	}

	closeBottomsheet(): void {
		// NOTE: this doesn't work?
		// this.uiService.closeAll();

		// NOTE: calling these together doesn't work either?
		// this.uiService.closeBottomSheet();
		// this.cardService.closeAllCards();

		this.cardService.closeAllCards().then(() => {
			this.uiService.closeBottomSheet();
		});
		// setTimeout(() => {
		// }, 400);
	}
}
