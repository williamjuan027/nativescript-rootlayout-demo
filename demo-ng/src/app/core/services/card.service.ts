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

    bringCardToFront(character: Character): Promise<void> {
        if (this._characterCards[character]) {
            return getRootLayout()
                .bringToFront(this._characterCards[character], true)
                .catch((err) => {
                    console.log("error bring to front", err);
                });
        } else {
            return this.openCard(character);
        }
    }

    openCard(character: Character): Promise<void> {
        if (!this._characterCards[character]) {
            const cardView = this.uiService.getView(CardComponent, {
                character: character,
            });
            return getRootLayout()
                .open(cardView, {
                    shadeCover: {
                        color: "#000",
                        opacity: 0.4,
                        tapToClose: true,
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
                            curve: DEFAULT_ANIMATION_CURVE,
                        },
                        exitTo: {
                            translateX: 350,
                            // translateY: -300,
                            // opacity: 0,
                            // scaleX: 0.5,
                            // scaleY: 0.5,
                            duration: 300,
                            curve: DEFAULT_ANIMATION_CURVE,
                        },
                    },
                })
                .then(() => {
                    this._characterCards[character] = cardView;
                })
                .catch((err) => {
                    console.log("error open", err);
                });
        }
    }

    closeCard(character: Character): Promise<void> {
        if (this._characterCards[character]) {
            return getRootLayout()
                .close(this._characterCards[character])
                .then(() => {
                    delete this._characterCards[character];
                })
                .catch((err) => {
                    console.log("error close", err);
                });
        }
    }
}
