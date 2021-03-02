import { Component } from "@angular/core";
import { UIService } from "../../../core";

@Component({
    moduleId: module.id,
    selector: "ns-snackbar",
    templateUrl: "./snackbar.component.html",
})
export class SnackbarComponent {
    constructor(private uiService: UIService) {}

    close(): void {
        this.uiService.closeSnackbar();
    }
}
