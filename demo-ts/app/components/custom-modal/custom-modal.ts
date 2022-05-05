import { layerComponents } from '~/models/layers.model';
import { UIService } from '../../services/ui.service';

export function close(): void {
    UIService.getInstance().closeLayer(layerComponents.customModal);
}
export function showSnackbar(): void {
    UIService.getInstance().openLayer(layerComponents.snackbar);
}
