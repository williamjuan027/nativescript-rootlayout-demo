import { Component, Input } from "@angular/core";
import { CardService, Character, UIService } from "../../../core";

@Component({
    moduleId: module.id,
    selector: "ns-card",
    templateUrl: "./card.component.html",
})
export class CardComponent {
    @Input() character: Character;

    characters = {
        rick: "https://upload.wikimedia.org/wikipedia/en/a/a6/Rick_Sanchez.png",
        morty: "https://upload.wikimedia.org/wikipedia/en/c/c3/Morty_Smith.png",
        squanchy:
            "https://static.wikia.nocookie.net/rickandmorty/images/1/16/Squanchy_.png",
        summer:
            "https://i.pinimg.com/originals/75/ad/2c/75ad2cae483ea8d808dc4b8997eb1948.png",
    };

    constructor(
        private uiService: UIService,
        private cardService: CardService
    ) {}

    getCharacterOptions() {
        return Object.keys(this.characters).reduce((acc, key) => {
            if (key !== this.character) {
                return acc.concat(key);
            }
            return acc;
        }, []);
    }

    bringToFront(characterOption: Character): void {
        this.cardService.bringCardToFront(characterOption);
    }
}
