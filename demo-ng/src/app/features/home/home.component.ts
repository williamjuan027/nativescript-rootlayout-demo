import { Component } from "@angular/core";
import { UIService, CardService, Character } from "../../core";

@Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent {
    constructor(
        private uiService: UIService,
        private cardService: CardService
    ) {}

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

    showRickAndMorty(): void {
        this.cardService.openCard(Character.rick);
    }
}
