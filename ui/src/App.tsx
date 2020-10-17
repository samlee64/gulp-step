import React from 'react';
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

type Props = {};

type State = {
  video: {
    name: string,
    src: any
  },
  muted: boolean
  // playing: boolean
};

class App extends React.Component<Props, State> {
  vidRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props)
    this.state = {
      video: {
        name: 'MoonJellies',
        src: jellyVid
      },
      muted: true
      // playing: true
    };

    this.vidRef = React.createRef();

    store.subscribe(() => {
      // let selectedScene = store.getState().scene
      // console.log(store.getState().scene)

      let sceneName = store.getState().scene;

      this.setState({
        video: {
          name: sceneName,
          src: bgDict[sceneName] // try map
        },
        muted: store.getState().muted
        // playing: store.getState().playing
      });

      // console.log(this.state.video.src);
    })
  }

  exitInfo = () => {
    if (store.getState().infoShown) {
      store.dispatch(toggleInfo())
    }
    // console.log(this.state.video)
  }

  playVideo = () => {
    if (this.vidRef.current != null) this.vidRef.current.play();
    // TODO: tell music to generate
  }

  pauseVideo = () => {
    if (this.vidRef.current != null) this.vidRef.current.pause();
    // TODO: tell music to pause generating
  }

  adjVolume = (val: number) => {
    if (this.vidRef.current != null) this.vidRef.current.volume = val;
  }

  // lookupVid = (vid: string) => {
  //   switch (vid) {
  //     // case 'MoonJellies':
  //     //   return Object.assign({}, state, {
  //     //     view: action.view
  //     //   })
  //     case 'MoonJellies':
  //       return jellyVid
  //     case 'OpenSea':
  //       return openSeaVid
  //     case 'CoralReef':
  //       return reefVid
  //     default:
  //       return jellyVid
  //   }
  //   // if (vid === 'MoonJellies') {
  //   //   return jellyVid
  //   // }
  //   // else if (vid === 'OpenSea') {
  //   //   return openSeaVid
  //   // }
  //   // else if (vid === 'CoralReef') {
  //   //   return reefVid
  //   // }
  // }

  render() {
    return (
      <>
        <div className="logo">GlubStep</div>
        <SplashModal />
        <Menu
          playCb={this.playVideo.bind(this)}
          pauseCb={this.pauseVideo.bind(this)}
          volumeCb={this.adjVolume.bind(this)}
        />
        <InfoModal />
        {/* <div id="video-bg" className={backgroundClass}
          // style={{ backgroundImage: 'url(' + this.state.video + ')' }}
          onClick={this.exitInfo}></div> */}
        {/* {vid} */}
        <video
          ref={this.vidRef}
          className="video-bg"
          autoPlay
          preload="auto"
          loop
          muted={this.state.muted}
          src={this.state.video.src}
          onClick={this.exitInfo}>
          {/* <source type="video/mp4" src={this.lookupVid(this.state.video.name)}></source> */}
        </video>
      </>
    )
  }
}

export default App;
