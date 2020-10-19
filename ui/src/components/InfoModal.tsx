import React, { useState } from "react"
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import CSSTransition from 'react-transition-group/CSSTransition'
import { store } from '../index'
import { toggleInfo } from '../actions'
import '../InfoModal.css'

const InfoModal = () => {
  const [visible, setVisible] = useState(false);

  store.subscribe(() => {
    setVisible(store.getState().infoShown);
  })

  const showInfo = () => {
    store.dispatch(toggleInfo()); // change store's infoShown value
  }

  return (
    <>
      {/* <TransitionGroup> */}
      {/* <CSSTransition
          in={this.state.visible}
          timeout={350}
          classNames="slide"
          unmountOnExit
          appear
        > */}
      <div id="info-modal" className={visible ? '' : 'invisible-modal'}>
        <button id="modal-x" className="icon-button" onClick={showInfo}>
          <svg width="17" height="17" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.585786 17.0359C-0.195262 17.817 -0.195262 19.0833 0.585786 19.8644C1.36683 20.6454 2.63316 20.6454 3.41421 19.8644L10.5118 12.7668L17.5558 19.8595C18.3341 20.6432 19.6004 20.6476 20.3842 19.8692C21.1679 19.0909 21.1723 17.8246 20.3939 17.0408L13.3402 9.93837L19.8644 3.41421C20.6454 2.63316 20.6454 1.36684 19.8644 0.585787C19.0833 -0.195262 17.817 -0.195263 17.0359 0.585787L10.5215 7.1002L4.06634 0.600391C3.28799 -0.183344 2.02167 -0.187705 1.23793 0.590648C0.454199 1.369 0.449837 2.63532 1.22819 3.41906L7.69309 9.92865L0.585786 17.0359Z" fill="white" />
          </svg>
        </button>
        <div id="info-content">
          <div className="section">
            <h2>How It Works</h2>
            <div id="cv"></div>
            <p>Generative music powered by machine learning and marine life. Generative music powered by machine learning and marine life.</p>
          </div>
          <div className="section">
            <h2>The Animals</h2>
            <p>Generative music powered by machine learning and marine life. Generative music powered by machine learning and marine life.</p>
            <div id="cv"></div>
          </div>
        </div>
      </div>
      {/* </CSSTransition> */}
      {/* </TransitionGroup> */}
    </>
  )
}

export default InfoModal