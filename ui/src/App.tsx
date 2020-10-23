import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { toggleInfo } from './state/actions';
import './css/App.css';
import './css/fonts.css';

import {
  SplashModal,
  Menu,
  InfoModal
} from './components';

const jellyVid = require('./assets/jelly.mp4');
const openSeaVid = require('./assets/opensea.mp4');
const reefVid = require('./assets/reef.mp4');

const scenesInfo: { [key: string]: any } = {
  'MoonJellies': {
    src: jellyVid,
    label: 'moon jellies'
  },
  'OpenSea': {
    src: openSeaVid,
    label: 'open sea'
  },
  'CoralReef': {
    src: reefVid,
    label: 'coral reef'
  }
}

interface AppProps {
  view: string;
  scene: string;
  muted: boolean;
  infoShown: boolean;
  toggleInfo: Function;
}

const App = (props: AppProps) => {
  const {
    scene,
    muted,
    infoShown
  } = props;

  const vidRef = useRef<HTMLVideoElement>(null);

  const video = {
    name: scene,
    ...scenesInfo[scene]
  }

  const exitInfo = () => {
    if (infoShown) {
      props.toggleInfo();
    }
  }

  const playVideo = () => {
    if (vidRef.current) vidRef.current.play();
    // TODO: tell music to generate
  }

  const pauseVideo = () => {
    if (vidRef.current) vidRef.current.pause();
    // TODO: tell music to pause generating
  }

  const adjVolume = (val: number) => {
    if (vidRef.current) vidRef.current.volume = val;
  }

  return (
    <>
      <div className="logo">GlubStep</div>
      <SplashModal visible={props.view != 'Main'} />
      <Menu
        playCb={playVideo.bind(this)}
        pauseCb={pauseVideo.bind(this)}
        volumeCb={adjVolume.bind(this)}
        scenesInfo={scenesInfo}
      />
      <InfoModal visible={props.infoShown} />
      <video
        ref={vidRef}
        className="video-bg"
        autoPlay
        preload="auto"
        loop
        muted={muted}
        src={video.src}
        onClick={exitInfo}>
      </video>
    </>
  )
}

// Pull specific variables out of global state
// Accessible via props
const mapStateToProps = (state: { view: string, scene: string, muted: boolean, infoShown: boolean }) => {
  const {
    view,
    scene,
    muted,
    infoShown
  } = state;

  return {
    view,
    scene,
    muted,
    infoShown
  };
};

// Create functions that dispatch actions
// Accessible via props
const mapDispatchToProps = (dispatch: Function) => {
  return {
    toggleInfo: () => { dispatch(toggleInfo()); }
  };
};

// Connect function uses props to pass reference to state variables in mapStateToProps and when invoked calls function to dispatch action
// ~subscribe to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);