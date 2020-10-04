import React from 'react';
// import { connect } from 'react-redux'
import './App.css';
import SplashModal from './components/SplashModal';
import Menu from './components/Menu';
import InfoModal from './components/InfoModal';
import { store } from './index';
import { toggleInfo } from './actions';
const jellyVid = require('./jelly.mp4');

type Props = {};

type State = {
  video: {
    name: string,
    link: string
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
        link: './jelly.mp4'
      },
      muted: true
      // playing: true
    };

    this.vidRef = React.createRef();

    const backgrounds: { [key: string]: string } = {
      'MoonJellies': './jelly.jpg',
      'OpenSea': './opensea.jpg',
      'CoralReef': './reef.jpg'
    }

    store.subscribe(() => {
      // let selectedScene = store.getState().scene
      // console.log(store.getState().scene)

      let sceneName = store.getState().scene;

      this.setState({
        video: {
          name: sceneName,
          link: backgrounds[sceneName] // try map
        },
        muted: store.getState().muted
        // playing: store.getState().playing
      })
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
  }

  pauseVideo = () => {
    if (this.vidRef.current != null) this.vidRef.current.pause();
  }

  adjVolume = (val: number) => {
    if (this.vidRef.current != null) this.vidRef.current.volume = val;
  }

  render() {
    // if (this.state.video.name === 'MoonJellies') {
    // var vid =
    //   <video className="video-bg" autoPlay controls muted={this.state.muted} loop onClick={this.exitInfo}>
    //     <source type="video/mp4" src={jellyVid}></source>
    //   </video>
    // } else {
    //   var vid = <div className="video-bg" style={{ backgroundImage: `url(${this.state.video.link})` }} onClick={this.exitInfo}></div>
    // }

    return (
      <>
        <SplashModal />
        <Menu playCb={this.playVideo.bind(this)} pauseCb={this.pauseVideo.bind(this)} volumeCb={this.adjVolume.bind(this)} />
        <InfoModal />
        {/* <div id="video-bg" className={backgroundClass}
          // style={{ backgroundImage: 'url(' + this.state.video + ')' }}
          onClick={this.exitInfo}></div> */}
        {/* {vid} */}
        <video ref={this.vidRef} className="video-bg" autoPlay loop muted={this.state.muted} onClick={this.exitInfo}>
          <source type="video/mp4" src={jellyVid}></source>
        </video>
      </>
    )
  }
}

export default App;
