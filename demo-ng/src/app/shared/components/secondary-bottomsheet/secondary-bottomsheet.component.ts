import { Component } from "@angular/core";
import { UIService } from "../../../core";

@Component({
    moduleId: module.id,
    selector: "ns-secondary-bottomsheet",
    templateUrl: "./secondary-bottomsheet.component.html",
})
export class SecondaryBottomsheetComponent {
    constructor(private uiService: UIService) {}

    close(): void {
        this.uiService.closeSecondaryBottomSheet();
    }

    showSnackbar(): void {
        this.uiService.showSnackbar();
    }

    closeBottomsheet(): void {
        this.uiService.closeBottomSheet();
    }
}
