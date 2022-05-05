import { layerComponents } from '~/models/layers.model';
import { UIService } from '../../services/ui.service';

export function close(): void {
    UIService.getInstance().closeLayer(layerComponents.sidebar);
}

export function openBottomsheet(): void {
    UIService.getInstance().openLayer(layerComponents.customModal);
}

export function openCustomModal(): void {
    UIService.getInstance().openLayer(layerComponents.customModal);
}
