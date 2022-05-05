import { Builder, getRootLayout, View } from "@nativescript/core"
import { layers, Layer, layerComponents } from "~/models/layers.model";

export class UIService {

  static getInstance(): UIService {
    return UIService._instance
  }

  private static _instance: UIService = new UIService()

  openLayer(component: layerComponents): void {
    this.getView(layers[component]).then((v) => {
      layers[component].view = v;
      getRootLayout().open(
        layers[component].view,
        {
          shadeCover: layers[component].shadeCover,
          animation: layers[component].animation
        }
      )
    }).then(() => {
      console.log('Opened ', layers[component].name)
    }).catch(err => {
      console.log(`Error opening ${layers[component].name}:`, err);
    })
  }

  closeLayer(component: layerComponents): void {
    if (layers[component].view) {
      getRootLayout()
      .close(layers[component].view)
      .then(() => {
        layers[component].view = undefined;
        console.log('Closed ', layers[component].name)
      })
      .catch((err) => {
        console.log(`Error closing ${layers[component].name}:`, err);
      }); 
    }
  }

  bringLayerToFront(component: layerComponents): Promise<void> {
    if (layers[component].view) {
      return getRootLayout().bringToFront(layers[component].view);
    }
    return Promise.reject('View not defined');
  }

  getView(layer: Layer): Promise<View> {
    return new Promise((resolve) => {
      const component = Builder.load({
        path: layer.path,
        name: layer.name,
        attributes: layer.attributes
        // path: '~/components/bottomsheet',
        // name: 'bottomsheet',
      })
      resolve(component);
    });
  }

}