import { ComponentFactoryResolver, Injectable, Injector } from "@angular/core";
import { isKnownView, registerElement } from "@nativescript/angular";
import {
    ContentView,
    getRootLayout,
    View,
    GridLayout,
} from "@nativescript/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { CardComponent } from "../../shared/components";
import { Character } from "../enums";
import { DEFAULT_ANIMATION_CURVE, UIService } from "./ui.service";

@Injectable({
    providedIn: "root",
})
export class CardService {
    private _characterCards = {};

    constructor(private uiService: UIService) {}

    bringCardToFront(character: Character): void {
        if (this._characterCards[character]) {
            getRootLayout().bringToFront(this._characterCards[character], true);
        } else {
            this.openCard(character);
        }
    }

    openCard(character: Character): void {
        if (!this._characterCards[character]) {
            const cardView = this.uiService.getView(CardComponent, {
                character: character,
            });
            getRootLayout()
                .open(cardView, {
                    shadeCover: {
                        color: "#000",
                        opacity: 0.4,
                        tapToClose: true,
                    },
                    animation: {
                        enterFrom: {
                            // translateY: -300,
                            opacity: 0,
                            scaleX: 0,
                            scaleY: 0,
                            duration: 300,
                            curve: DEFAULT_ANIMATION_CURVE,
                        },
                        // TODO: Something is wrong with this
                        exitTo: {
                            // translateY: -300,
                            opacity: 0,
                            scaleX: 0,
                            scaleY: 0,
                            duration: 300,
                            curve: DEFAULT_ANIMATION_CURVE,
                        },
                    },
                })
                .then(() => {
                    this._characterCards[character] = cardView;
                });
        }
    }

    closeCard(character: Character): void {
        if (this._characterCards[character]) {
            getRootLayout()
                .close(this._characterCards[character])
                .then(() => {
                    delete this._characterCards[character];
                });
        }
    }
}
