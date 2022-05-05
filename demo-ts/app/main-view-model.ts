import { Observable } from '@nativescript/core'
import { layerComponents } from './models/layers.model';
import { UIService } from './services/ui.service';

export class HelloWorldModel extends Observable {

  options = [
		{ displayName: 'Bottom Sheet', preview: '~/assets/images/bottomsheet.png', onTap: () => UIService.getInstance().openLayer(layerComponents.bottomsheet) },
		{ displayName: 'Mini Bottom Sheet', preview: '~/assets/images/mini-bottomsheet.png', onTap: () => UIService.getInstance().openLayer(layerComponents.miniBottomsheet) },
		{ displayName: 'Custom Modal', preview: '~/assets/images/modal.png', onTap: () => UIService.getInstance().openLayer(layerComponents.customModal) },
		{ displayName: 'Snackbar', preview: '~/assets/images/snackbar.png', onTap: () => UIService.getInstance().openLayer(layerComponents.snackbar) },
		{ displayName: 'Sidebar', preview: '~/assets/images/sidebar.png', onTap: () => UIService.getInstance().openLayer(layerComponents.sidebar) },
	];

  constructor() {
    super();
	}
}
