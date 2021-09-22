import { ComponentFactoryResolver, Injectable, Injector, NgZone, ApplicationRef, ComponentRef } from '@angular/core';
import { generateNativeScriptView } from '@nativescript/angular';
import { getRootLayout, View, CoreTypes, ProxyViewContainer } from '@nativescript/core';
import { BottomsheetComponent, CustomModalComponent, SecondaryBottomsheetComponent, CardBottomsheetComponent, SnackbarComponent, SidebarComponent } from '../../shared/components';
import { GenericParams } from '../tokens';

export const DEFAULT_ANIMATION_CURVE = CoreTypes.AnimationCurve.cubicBezier(0.17, 0.89, 0.24, 1.11);

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private zone: NgZone, private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) { }

  private _bottomSheetView;
  private _secondaryBottomSheetView;
  private _snackbar;
  private _customModal;
  private _sidebar;

  showBottomSheet(forCard?: boolean): void {
    this.getView(forCard ? CardBottomsheetComponent : BottomsheetComponent).then((v) => {
      this._bottomSheetView = v;
      getRootLayout()
        .open(this._bottomSheetView, {
          shadeCover: forCard
            ? null
            : {
              color: '#FFF',
              opacity: forCard ? 0 : 0.7,
              tapToClose: true,
            },
          animation: {
            enterFrom: {
              translateY: 500,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
            exitTo: {
              translateY: 500,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
          },
        })
        .then(() => {
          console.log('opened');
        })
        .catch((err) => {
          console.log('error opening', err);
        });
    });
  }

  bringBottomSheetToFront(): Promise<void> {
    return getRootLayout().bringToFront(this._bottomSheetView);
  }

  closeBottomSheet(): void {
    if (this._bottomSheetView) {
      getRootLayout()
        .close(this._bottomSheetView)
        .then(() => {
          this.destroyNgRef(this._bottomSheetView);
          console.log('closed');
        })
        .catch((err) => {
          console.log('error closing', err);
        });
    }
  }

  showSecondaryBottomSheet(): void {
    this.getView(SecondaryBottomsheetComponent).then((v) => {
      this._secondaryBottomSheetView = v;
      getRootLayout()
        .open(this._secondaryBottomSheetView, {
          shadeCover: {
            color: '#FFF',
            opacity: 0.7,
            tapToClose: true,
          },
          animation: {
            enterFrom: {
              translateY: 500,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
            exitTo: {
              translateY: 500,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
          },
        })
        .then(() => {
          console.log('opened');
        })
        .catch((err) => {
          console.log('error opening', err);
        });
    });
  }

  closeSecondaryBottomSheet(): void {
    if (this._secondaryBottomSheetView) {
      getRootLayout()
        .close(this._secondaryBottomSheetView)
        .then(() => {
          this.destroyNgRef(this._secondaryBottomSheetView);
          console.log('closed');
        })
        .catch((err) => {
          console.log('error closing', err);
        });
    }
  }

  showCustomModal(): void {
    this.getView(CustomModalComponent).then((v) => {
      this._customModal = v;
      getRootLayout()
        .open(this._customModal, {
          shadeCover: {
            color: '#FFF',
            opacity: 0.7,
            tapToClose: true,
          },
          animation: {
            enterFrom: {
              translateY: -200,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
            exitTo: {
              translateY: -200,
              opacity: 0,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
          },
        })
        .then(() => {
          console.log('opened');
        })
        .catch((err) => {
          console.log('error opening', err);
        });
    });
  }

  closeCustomModal(): void {
    if (this._customModal) {
      getRootLayout()
        .close(this._customModal)
        .then(() => {
          this.destroyNgRef(this._customModal);
          console.log('closed');
        })
        .catch((err) => {
          console.log('error closing', err);
        });
    }
  }

  showSnackbar(): void {
    this.getView(SnackbarComponent).then((v) => {
      this._snackbar = v;
      getRootLayout()
        .open(this._snackbar, {
          shadeCover: {
            color: '#FFF',
            opacity: 0.7,
            tapToClose: true,
          },
          animation: {
            enterFrom: {
              translateY: -300,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
            exitTo: {
              translateY: -300,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
          },
        })
        .then(() => {
          console.log('opened');
          setTimeout(() => {
            this.closeSnackbar();
          }, 1000);
        })
        .catch((err) => {
          console.log('error opening', err);
        });
    });
  }

  closeSnackbar(): void {
    if (this._snackbar) {
      getRootLayout()
        .close(this._snackbar)
        .then(() => {
          this.destroyNgRef(this._snackbar);
          console.log('closed');
        })
        .catch((err) => {
          console.log('error closing', err);
        });
    }
  }

  showSidebar(): void {
    this.getView(SidebarComponent).then((v) => {
      this._sidebar = v;
      getRootLayout()
        .open(this._sidebar, {
          shadeCover: {
            color: '#FFF',
            opacity: 0.7,
            tapToClose: true,
          },
          animation: {
            enterFrom: {
              translateX: -300,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
            exitTo: {
              translateX: -300,
              duration: 300,
              curve: DEFAULT_ANIMATION_CURVE,
            },
          },
        })
        .then(() => {
          console.log('opened');
        })
        .catch((err) => {
          console.log('error opening', err);
        });
    });
  }

  closeSidebar(): void {
    if (this._sidebar) {
      getRootLayout()
        .close(this._sidebar)
        .then(() => {
          this.destroyNgRef(this._sidebar);
          console.log('closed');
        })
        .catch((err) => {
          console.log('error closing', err);
        });
    }
  }

  closeAll(): void {
    getRootLayout().closeAll();
  }

  destroyNgRef(view: View) {
    if ((<any>view).__ngRef) {
      ((<any>view).__ngRef as ComponentRef<View>).destroy();
    }
  }

  getView(component, input?: any): Promise<View> {
    return new Promise((resolve) => {
      const injector = Injector.create({
        providers: [{ provide: GenericParams, useValue: input }],
        parent: this.injector,
      });
      const cmpRef = generateNativeScriptView(component, {
        injector,
      });
      (<any>cmpRef.firstNativeLikeView).__ngRef = cmpRef.ref;
      resolve(cmpRef.firstNativeLikeView);
    });
  }
}
