import { layerComponents } from '~/models/layers.model';
import { UIService } from '../../services/ui.service';

export function close(): void {
    UIService.getInstance().closeLayer(layerComponents.miniBottomsheet);
}
export function showSnackbar(): void {
    UIService.getInstance().openLayer(layerComponents.snackbar);
}

export function closeBottomsheet(): void {
    UIService.getInstance().closeLayer(layerComponents.bottomsheet);
}