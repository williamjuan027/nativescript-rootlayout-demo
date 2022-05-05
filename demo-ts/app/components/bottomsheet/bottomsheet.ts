import { layerComponents } from '~/models/layers.model';
import { UIService } from '../../services/ui.service';

export function close(): void {
    UIService.getInstance().closeLayer(layerComponents.bottomsheet);
}
export function openMiniBottomsheet(): void {
    UIService.getInstance().openLayer(layerComponents.miniBottomsheet);
}

export function openCustomModal(): void {
    UIService.getInstance().openLayer(layerComponents.customModal);
}