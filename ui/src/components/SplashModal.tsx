import React, { useState } from "react";
// import { connect } from 'react-redux'
import { store } from '../index'
import { changeToView, toggleMute } from '../actions'
import '../SplashModal.css';

const SplashModal = () => {
  const [visible, setVisible] = useState(true);

  store.subscribe(() => {
    // this.setState({ visible: store.getState().view === 'Splash' })
    setVisible(store.getState().view === 'Splash');
  })

  const enterMain = () => {
    store.dispatch(changeToView('Main')) // change store's view value to 'Main'
    store.dispatch(toggleMute()) // unmute video
    // TODO: start music composition, unless music started on mount
  }

  return (
    <div id="splash-modal" className={visible ? '' : 'invisible'}>
      <div id="splash-content">
        <h1>Generative music powered by machine learning and marine life</h1>
        <p>Generative music powered by machine learning and marine life. Generative music powered by machine learning and marine life.</p>
        <button id="enter" className="button button-fill" onClick={enterMain}>Enter</button>
      </div>
    </div>
  )
}

export default SplashModal
