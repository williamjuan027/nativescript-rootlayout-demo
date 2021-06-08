import { Injectable } from '@angular/core';
import { getRootLayout } from '@nativescript/core';
import { CardComponent } from '../../shared/components';
import { Character } from '../enums';
import { DEFAULT_ANIMATION_CURVE, UIService } from './ui.service';

// Bad/deprecated import that should still work in 8, TODO: need to fix in core
// import { AnimationCurve } from "@nativescript/core/ui/enums";

@Injectable({
	providedIn: 'root'
})
export class CardService {
	characters = {
		rick: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Rick_Sanchez.png',
		morty: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Morty_Smith.png',
		squanchy: 'https://static.wikia.nocookie.net/rickandmorty/images/1/16/Squanchy_.png',
		summer: 'https://i.pinimg.com/originals/75/ad/2c/75ad2cae483ea8d808dc4b8997eb1948.png'
	};
	private _characterCards = {};

	constructor(private uiService: UIService) {}

	bringCardToFront(character: Character): Promise<void> {
		if (this._characterCards[character]) {
			return getRootLayout()
				.bringToFront(this._characterCards[character], true)
				.catch(err => {
					console.log('error bring to front', err);
				});
		} else {
			return this.openCard(character);
		}
	}

	openCard(character: Character): Promise<void> {
		return new Promise(resolve => {
			if (!this._characterCards[character]) {
				this.uiService
					.getView(CardComponent, {
						character: character
					})
					.then(cardView => {
						return getRootLayout()
							.open(cardView, {
								shadeCover: {
									color: '#000',
									opacity: 0.4,
									tapToClose: true
								},
								animation: {
									enterFrom: {
										// TODO: translateY with negative was causing problems when iosOverflowSafeArea is true (by default)
										// translateY: -300,
										translateX: 350,
										// opacity: 0,
										// scaleX: 0.5,
										// scaleY: 0.5,
										duration: 300,
										curve: DEFAULT_ANIMATION_CURVE
									},
									exitTo: {
										translateX: 350,
										// translateY: -300,
										// opacity: 0,
										// scaleX: 0.5,
										// scaleY: 0.5,
										duration: 300,
										curve: DEFAULT_ANIMATION_CURVE
									}
								}
							})
							.then(() => {
								this._characterCards[character] = cardView;
								resolve();
							})
							.catch(err => {
								console.log('error open', err);
							});
					});
			}
		});
	}

	closeCard(character: Character): Promise<void> {
		return new Promise(resolve => {
			if (this._characterCards[character]) {
				getRootLayout()
					.close(this._characterCards[character])
					.then(() => {
						this.uiService.destroyNgRef(this._characterCards[character]);
						delete this._characterCards[character];
						resolve();
					})
					.catch(err => {
						console.log('error close', err);
					});
			}
		});
	}

	closeAllCards(): Promise<void> {
		return new Promise(resolve => {
			let cnt = 0;
			const cardKeys = Object.keys(this._characterCards);
			const closeIt = () => {
				const key = cardKeys[cnt];
				this.closeCard(<any>key);
				cnt++;
				if (cnt === cardKeys.length) {
					resolve();
				} else {
					setTimeout(() => {
						closeIt();
					}, 200);
				}
			};
			closeIt();
		});
	}
}
