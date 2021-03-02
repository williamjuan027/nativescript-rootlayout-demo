import { Component } from "@angular/core";
import { UIService } from "../../../core";

@Component({
    moduleId: module.id,
    selector: "ns-bottomsheet",
    templateUrl: "./bottomsheet.component.html",
})
export class BottomsheetComponent {
    constructor(private uiService: UIService) {}

    close(): void {
        this.uiService.closeBottomSheet();
    }

    openSecondaryBottomsheet(): void {
        this.uiService.showSecondaryBottomSheet();
    }

    openCustomModal(): void {
        this.uiService.showCustomModal();
    }
}
