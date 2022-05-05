import { View, CoreTypes } from "@nativescript/core"
import { TransitionAnimation } from "@nativescript/core/ui/layouts/root-layout"

export interface Layer {
path: string,  // directory name
name: string,  // component's file name
attributes?: any,
view: View | undefined,
shadeCover: {
    color: string,
    opacity: number,
    tapToClose: boolean
},
animation: {
    enterFrom: TransitionAnimation,
    exitTo: TransitionAnimation,
}
}
export const DEFAULT_ANIMATION_CURVE = CoreTypes.AnimationCurve.cubicBezier(0.17, 0.89, 0.24, 1.11);

export const defaultAnimation = {
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
}
export const defaultShadeCover = {
    color: '#FFF',
    opacity:  0.7,
    tapToClose: true,
}

export const layers: { [key: string]: Layer } = {
    bottomsheet: {
        view: undefined,
        path: '~/components/bottomsheet',
        name: 'bottomsheet',
        shadeCover: defaultShadeCover,
        animation: defaultAnimation
    },
    miniBottomsheet: {
        view: undefined,
        path: '~/components/mini-bottomsheet',
        name: 'mini-bottomsheet',
        shadeCover: defaultShadeCover,
        animation: defaultAnimation
    },
    customModal: {
        view: undefined,
        path: '~/components/custom-modal',
        name: 'custom-modal',
        shadeCover: defaultShadeCover,
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
        }
    },
    snackbar: {
        view: undefined,
        path: '~/components/snackbar',
        name: 'snackbar',
        shadeCover: defaultShadeCover,
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
          }
    },
    sidebar: {
        view: undefined,
        path: '~/components/sidebar',
        name: 'sidebar',
        shadeCover: defaultShadeCover,
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
          }
    }
}

export enum layerComponents {
    bottomsheet = 'bottomsheet',
    miniBottomsheet = 'miniBottomsheet',
    customModal = 'customModal',
    snackbar = 'snackbar',
    sidebar = 'sidebar'
}