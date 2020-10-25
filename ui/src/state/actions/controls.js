export const ActionTypes = {
  CHANGE_TO_VIEW: 'CHANGE_TO_VIEW',
  CHANGE_TO_SCENE: 'CHANGE_TO_SCENE',
  TOGGLE_INFO: 'TOGGLE_INFO',
  // TOGGLE_PLAY: 'TOGGLE_PLAY',
  // CHANGE_VOLUME: 'CHANGE_VOLUME',
  TOGGLE_MUTE: 'TOGGLE_MUTE'
};


export const changeToView = (view) => {
  return {
    type: ActionTypes.CHANGE_TO_VIEW,
    payload: view
  };
}

export const changeToScene = (scene) => {
  return {
    type: ActionTypes.CHANGE_TO_SCENE,
    payload: scene
  };
}

export const toggleInfo = () => {
  return {
    type: ActionTypes.TOGGLE_INFO
  };
}

// export function toggleVideo() {
//   return {
//     type: TOGGLE_PLAY
//   }
// }

// export function changeVolume(val) {
//   return {
//     type: CHANGE_VOLUME,
//     val
//   }
// }

export const toggleMute = () => {
  return {
    type: ActionTypes.TOGGLE_MUTE
  };
}