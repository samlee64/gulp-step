import React, { useState, useRef } from 'react';
// import { connect } from 'react-redux'
import './App.css';
import './fonts.css';
import SplashModal from './components/SplashModal';
import Menu from './components/Menu';
import InfoModal from './components/InfoModal';
import { store } from './index';
import { toggleInfo } from './actions';
const jellyVid = require('./assets/jelly.mp4');
const openSeaVid = require('./assets/opensea.mp4');
const reefVid = require('./assets/reef.mp4');

const scenesInfo: { [key: string]: any } = {
  'MoonJellies': {
    // name: 'MoonJellies',
    src: jellyVid,
    label: 'moon jellies'
  },
  'OpenSea': {
    // name: 'OpenSea',
    src: openSeaVid,
    label: 'open sea'
  },
  'CoralReef': {
    // name: 'CoralReef',
    src: reefVid,
    label: 'coral reef'
  }
}

// const colorThief = new ColorThief();
// const img = document.querySelector('img');

// // Make sure image is finished loading
// if (img.complete) {
//   colorThief.getColor(img);
// } else {
//   image.addEventListener('load', function () {
//     colorThief.getColor(img);
//   });
// }

const App = () => {
  const vidRef = useRef<HTMLVideoElement>(null);

  // set default video state based on store value
  const [video, setVideo] = useState({
    name: store.getState().scene,
    src: scenesInfo[store.getState().scene].src,
    label: scenesInfo[store.getState().scene].label
  });
  const [muted, setMuted] = useState(store.getState().muted);

  store.subscribe(() => {
    setVideo({
      name: store.getState().scene,
      src: scenesInfo[store.getState().scene].src,
      label: scenesInfo[store.getState().scene].label
    });
    setMuted(store.getState().muted);
  })

  const exitInfo = () => {
    if (store.getState().infoShown) {
      store.dispatch(toggleInfo())
    }
  }

  const playVideo = () => {
    if (vidRef.current != null) vidRef.current.play();
    // TODO: tell music to generate
  }

  const pauseVideo = () => {
    if (vidRef.current != null) vidRef.current.pause();
    // TODO: tell music to pause generating
  }

  const adjVolume = (val: number) => {
    if (vidRef.current != null) vidRef.current.volume = val;
  }

  return (
    <>
      <div className="logo">GlubStep</div>
      <SplashModal />
      <Menu
        playCb={playVideo.bind(this)}
        pauseCb={pauseVideo.bind(this)}
        volumeCb={adjVolume.bind(this)}
        scenesInfo={scenesInfo}
      />
      <InfoModal />
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

export default App;
