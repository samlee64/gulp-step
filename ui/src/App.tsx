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

const bgDict: { [key: string]: any } = {
  'MoonJellies': jellyVid,
  'OpenSea': openSeaVid,
  'CoralReef': reefVid
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

  const [video, setVideo] = useState({ name: 'MoonJellies', src: jellyVid });
  const [muted, setMuted] = useState(true);

  store.subscribe(() => {
    let sceneName = store.getState().scene;
    setVideo({
      name: sceneName,
      src: bgDict[sceneName]
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
    <div>
      <div className="logo">GlubStep</div>
      <SplashModal />
      <Menu
        playCb={playVideo.bind(this)}
        pauseCb={pauseVideo.bind(this)}
        volumeCb={adjVolume.bind(this)}
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
    </div>
  )
}

export default App;
