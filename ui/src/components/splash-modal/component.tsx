import React from 'react';
import { connect } from 'react-redux';
import { changeToView, toggleMute } from '../../state/actions';
import '../css/SplashModal.css';

interface SplashProps {
  visible: boolean;
  changeToView: Function;
  toggleMute: Function;
}

const SplashModal = (props: SplashProps) => {
  const enterMain = () => {
    props.changeToView('Main'); // change store's view value to 'Main'
    props.toggleMute(); // unmute video
    // TODO: start music composition, unless music started on mount
  }

  return (
    <div id="splash-modal" className={props.visible ? '' : 'invisible'}>
      <div id="splash-content">
        <h1>Generative music powered by machine learning and marine life</h1>
        <p>Generative music powered by machine learning and marine life. Generative music powered by machine learning and marine life.</p>
        <button id="enter" className="label-button label-button-fill" onClick={enterMain}>Enter</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: {}) => {
  const {
  } = state;

  return {
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    changeToView: (view: string) => { dispatch(changeToView(view)); },
    toggleMute: () => { dispatch(toggleMute()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashModal);