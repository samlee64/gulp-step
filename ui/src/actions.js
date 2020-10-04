export const CHANGE_TO_VIEW = 'CHANGE_TO_VIEW'
export const CHANGE_TO_SCENE = 'CHANGE_TO_SCENE'
export const TOGGLE_INFO = 'TOGGLE_INFO'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
// export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const TOGGLE_MUTE = 'TOGGLE_MUTE'


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

export function toggleVideo() {
  return {
    type: TOGGLE_PLAY
  }
}

// export function changeVolume(val) {
//   return {
//     type: CHANGE_VOLUME,
//     val
//   }
// }

export function toggleMute() {
  return {
    type: TOGGLE_MUTE
  }
}