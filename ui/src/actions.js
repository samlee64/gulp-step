export const CHANGE_TO_VIEW = 'CHANGE_TO_VIEW'
export const CHANGE_TO_SCENE = 'CHANGE_TO_SCENE'
export const TOGGLE_INFO = 'TOGGLE_INFO'

export function changeToView(view) {
    return {
        type: CHANGE_TO_VIEW,
        view
    }
}

export function changeToScene(scene) {
    return {
        type: CHANGE_TO_SCENE,
        scene
    }
}

export function toggleInfo() {
    return {
        type: TOGGLE_INFO
    }
}