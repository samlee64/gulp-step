import { CHANGE_TO_VIEW, CHANGE_TO_SCENE, TOGGLE_INFO } from './actions'

const initialState = {
    view: 'Splash',
    scene: 'MoonJellies',
    infoShown: false
}

function visibilityFilter(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TO_VIEW:
            return Object.assign({}, state, {
                view: action.view
            })
        case CHANGE_TO_SCENE:
            return Object.assign({}, state, {
                scene: action.scene
            })
        case TOGGLE_INFO:
            return Object.assign({}, state, {
                infoShown: !state.infoShown
            })
        default:
            return state
    }
}

export default visibilityFilter