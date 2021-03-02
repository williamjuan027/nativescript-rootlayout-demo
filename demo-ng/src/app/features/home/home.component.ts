import { Component } from "@angular/core";
import { UIService } from "../../core";

@Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent {
    constructor(private uiService: UIService) {}

    showBottomSheet(): void {
        this.uiService.showBottomSheet();
    }

    showMiniBottomSheet(): void {
        this.uiService.showSecondaryBottomSheet();
    }

    showSnackbar(): void {
        this.uiService.showSnackbar();
    }
}
