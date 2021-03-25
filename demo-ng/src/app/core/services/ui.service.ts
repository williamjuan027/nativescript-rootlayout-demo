import { ComponentFactoryResolver, Injectable, Injector, NgZone, ApplicationRef, ComponentRef } from '@angular/core';
import { isKnownView, registerElement, DetachedLoader } from '@nativescript/angular';
import { getRootLayout, View, GridLayout, CoreTypes, ProxyViewContainer } from '@nativescript/core';
import { BottomsheetComponent, CustomModalComponent, SecondaryBottomsheetComponent, CardBottomsheetComponent, SnackbarComponent } from '../../shared/components';
import { GenericParams } from '../tokens';

// Bad/deprecated import that should still work in 8, TODO: need to fix in core
// import { AnimationCurve } from "@nativescript/core/ui/enums";

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

	bringBottomSheetToFront() {
		getRootLayout().bringToFront(this._bottomSheetView);
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
					// TODO: shadecover is required to run close animation - this is not right
					shadeCover: {
						color: '#FFF',
						opacity: 0.7,
						tapToClose: true,
					},
					animation: {
						// TODO: transition without translate X/Y doesn't align elements to center,
						// should fix that
						enterFrom: {
							// translateX: 200,
							translateY: -200,
							// scaleX: 0,
							// scaleY: 0,
							// rotate: 180,
							// opacity: 0,
							duration: 300,
							curve: DEFAULT_ANIMATION_CURVE,
						},
						// TODO: Something is wrong with this
						exitTo: {
							// translateX: 200,
							translateY: -200,
							// scaleX: 0,
							// scaleY: 0,
							// rotate: -180,
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
					// TODO: shadecover is required to run close animation - this is not right
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
						// TODO: Something is wrong with this
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

	closeAll(): void {
		getRootLayout().closeAll();
	}

	destroyNgRef(view: View) {
		if((<any>view).__ngRef) {
			((<any>view).__ngRef as ComponentRef<View>).destroy();
		}
	}

	getView(component, input?: any): Promise<View> {
		return new Promise((resolve) => {
			// We need to add the components into the module's entryComponents array to tell Angular that
			// the component will be loaded imperatively (we're not loading it by referencing it in the template)
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory<View>(component);

			// NOTE: This has to happen prior to creating the component or the animation won't work
			// Related to the following issues:
			// https://github.com/NativeScript/nativescript-angular/issues/1691
			// https://github.com/NativeScript/nativescript-angular/issues/1547
			// There is an issue with ProxyViewContainer not having some layout/view related information
			// that makes it not animatable
			// if (!isKnownView(componentFactory.selector)) {
			// 	// registerElement(componentFactory.selector, () => ContentView);
			// 	// TODO: For some reason if its set as ContentView or StackLayout, animating scaleX and scaleY
			// 	// messes up the position of the element (tested on ios simulator)
			// 	registerElement(componentFactory.selector, () => GridLayout);
			// }
			this.zone.run(() => {
				const childInjector = Injector.create({
					providers: [{ provide: GenericParams, useValue: input }],
					parent: this.injector
				});
				const componentRef = componentFactory.create(childInjector);
				let componentView = componentRef.location.nativeElement;
				if(componentView instanceof ProxyViewContainer) {
					componentView = componentView.getChildAt(0);
				}

				if (componentView.parent) {
					// (<any>componentView.parent)._ngDialogRoot = componentView;
					(<any>componentView.parent).removeChild(componentView);
				}
				(<any>componentView).__ngRef = componentRef;
				this.applicationRef.attachView(componentRef.hostView);
				componentRef.changeDetectorRef.detectChanges();

				resolve(componentView);
			});

		});
	}
}
