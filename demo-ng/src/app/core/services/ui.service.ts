import { ComponentFactoryResolver, Injectable, Injector } from "@angular/core";
import { isKnownView, registerElement } from "@nativescript/angular";
import { ContentView, getRootLayout, View } from "@nativescript/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import {
    BottomsheetComponent,
    SecondaryBottomsheetComponent,
} from "../../shared/components";

export const DEFAULT_ANIMATION_CURVE = AnimationCurve.cubicBezier(
    0.17,
    0.89,
    0.24,
    1.11
);

@Injectable({
    providedIn: "root",
})
export class UIService {
    constructor(
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    private _bottomSheetView;
    private _secondaryBottomSheetView;
    showBottomSheet(): void {
        this._bottomSheetView = this._getView(BottomsheetComponent);
        getRootLayout()
            .open(this._bottomSheetView, {
                shadeCover: {
                    color: "#FFF",
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
                console.log("opened");
            })
            .catch((err) => {
                console.log("error opening", err);
            });
    }

    closeBottomSheet(): void {
        if (this._bottomSheetView) {
            getRootLayout()
                .close(this._bottomSheetView)
                .then(() => {
                    console.log("closed");
                })
                .catch((err) => {
                    console.log("error closing", err);
                });
        }
    }

    showSecondaryBottomSheet(): void {
        this._secondaryBottomSheetView = this._getView(
            SecondaryBottomsheetComponent
        );
        getRootLayout()
            .open(this._secondaryBottomSheetView, {
                shadeCover: {
                    color: "#FFF",
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
                console.log("opened");
            })
            .catch((err) => {
                console.log("error opening", err);
            });
    }

    closeSecondaryBottomSheet(): void {
        if (this._secondaryBottomSheetView) {
            getRootLayout()
                .close(this._secondaryBottomSheetView)
                .then(() => {
                    console.log("closed");
                })
                .catch((err) => {
                    console.log("error closing", err);
                });
        }
    }

    closeAll(): void {
        getRootLayout().closeAll();
    }

    private _getView(component): View {
        // We need to add the components into the module's entryComponents array to tell Angular that
        // the component will be loaded imperatively (we're not loading it by referencing it in the template)
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            component
        );

        // NOTE: This has to happen prior to creating the component or the animation won't work
        // Related to the following issues:
        // https://github.com/NativeScript/nativescript-angular/issues/1691
        // https://github.com/NativeScript/nativescript-angular/issues/1547
        // There is an issue with ProxyViewContainer not having some layout/view related information
        // that makes it not animatable
        if (!isKnownView(componentFactory.selector)) {
            registerElement(componentFactory.selector, () => ContentView);
        }

        const componentRef = componentFactory.create(this.injector);

        return componentRef.location.nativeElement;
    }
}
