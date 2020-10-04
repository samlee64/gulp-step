import { CHANGE_TO_VIEW, CHANGE_TO_SCENE, TOGGLE_INFO, TOGGLE_PLAY, CHANGE_VOLUME, TOGGLE_MUTE } from './actions'

const initialState = {
    view: 'Splash',
    // scene: { name: 'MoonJellies', link: './jelly.mp4' },
    scene: 'MoonJellies',
    infoShown: false,
    playing: true,
    // storedVolume: 1,
    muted: true
}

function reducer(state = initialState, action) {
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
        case TOGGLE_PLAY:
            return Object.assign({}, state, {
                playing: !state.playing
            })
        // case CHANGE_VOLUME:
        //     console.log('volume changed to', action.val)
        //     return Object.assign({}, state, {
        //         storedVolume: action.val
        //     })
        case TOGGLE_MUTE:
            return Object.assign({}, state, {
                muted: !state.muted
            })
        default:
            return state
    }
}

export default reducer