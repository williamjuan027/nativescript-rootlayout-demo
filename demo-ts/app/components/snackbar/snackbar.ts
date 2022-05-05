import { layerComponents } from '~/models/layers.model';
import { UIService } from '../../services/ui.service';

export function close(): void {
    UIService.getInstance().closeLayer(layerComponents.snackbar);
}
