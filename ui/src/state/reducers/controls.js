import { ActionTypes } from '../actions/controls';

const initialState = {
    view: 'Splash',
    scene: 'MoonJellies',
    infoShown: false,
    // playing: true,
    // storedVolume: 1,
    muted: true
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_TO_VIEW:
            return { ...state, view: action.payload }
        case ActionTypes.CHANGE_TO_SCENE:
            return { ...state, scene: action.payload }
        case ActionTypes.TOGGLE_INFO:
            return { ...state, infoShown: !state.infoShown }
        // case ActionTypes.TOGGLE_PLAY:
        //     return Object.assign({}, state, {
        //         playing: !state.playing
        //     })
        // case ActionTypes.CHANGE_VOLUME:
        //     console.log('volume changed to', action.val)
        //     return Object.assign({}, state, {
        //         storedVolume: action.val
        //     })
        case ActionTypes.TOGGLE_MUTE:
            return { ...state, muted: !state.muted }
        default:
            return state
    }
}

export default reducer