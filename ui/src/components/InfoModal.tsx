import React from 'react';
import { connect } from 'react-redux';
import { toggleInfo } from '../actions';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import CSSTransition from 'react-transition-group/CSSTransition'
import '../InfoModal.css';

const xIcon = require('../assets/x.svg');

const InfoModal = (props: { visible: boolean, toggleInfo: Function }) => {
  const showInfo = () => {
    props.toggleInfo(); // change store's infoShown value
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
      <div id="info-modal" className={props.visible ? '' : 'invisible-modal'}>
        <button id="modal-x" className="icon-button" onClick={showInfo}>
          {xIcon}
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

const mapStateToProps = (state: { scene: string, muted: boolean, infoShown: boolean }) => {
  const {
  } = state;

  return {
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    toggleInfo: () => { dispatch(toggleInfo()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoModal);