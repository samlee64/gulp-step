import React from "react"
// import { connect } from 'react-redux'
import { store } from '../index'
import { toggleInfo, changeToScene, toggleMute } from '../actions'
import '../Menu.css'
// import playIcon from '../assets/play.svg'
// import pauseIcon from '../assets/pause.svg'


type Props = {
  playCb: () => void;
  pauseCb: () => void;
  volumeCb: (val: number) => void;
};

type State = {
  visible: boolean;
  playing: boolean;
  setVolume: number;
  muted: boolean;
  showSlider: boolean;
  infoShown: boolean;
};

class Menu extends React.Component<Props, State> {
  sliderRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false,
      playing: true,
      setVolume: 0.66,
      muted: true,
      showSlider: false,
      infoShown: false
    }

    this.sliderRef = React.createRef();

    store.subscribe(() => {
      this.setState({
        visible: store.getState().view === 'Main',
        // playing: store.getState().playing,
        // storedVolume: store.getState().storedVolume,
        muted: store.getState().muted,
        infoShown: store.getState().infoShown
      })
    })
  }

  handleScene = (scene: string) => (event: any) => {
    store.dispatch(changeToScene(scene))
    event.target.parentNode.childNodes.forEach(
      (btn: { classList: { remove: (arg0: string) => any; }; }) => btn.classList.remove("button-fill"))
    event.target.classList.add('button-fill')
    this.setState({ playing: true });
  }

  handleInfo = () => {
    store.dispatch(toggleInfo()) // change store's infoShown value
    // console.log(store.getState().infoShown)
  }

  handlePlay = () => {
    this.state.playing ? this.props.pauseCb() : this.props.playCb(); // call play function via props from App
    // store.dispatch(toggleVideo()); // change store's playing value
    this.setState({ playing: !this.state.playing }); // toggle local playing for icon toggle (instead of sending to store and subscribing)
    // console.log('Video is playing:', this.state.playing);
  }

  handleMute = () => {
    // this.setState({ muted: !this.state.muted });
    store.dispatch(toggleMute());
    var val = this.state.muted ? this.state.setVolume : 0;
    if (this.sliderRef.current != null) this.sliderRef.current.value = val.toString();  // change slider value
    // store.dispatch(changeVolume(val));
  }

  handleVolume = (event: any) => {
    // store.dispatch(changeVolume(event.target.value)); // change store's volume value
    if (this.state.muted) store.dispatch(toggleMute());
    this.props.volumeCb(event.target.value);  // call adjust volume function via props from App
    this.setState({ setVolume: event.target.value }); // store volume when you manually adjust slider (or when it changes at all?); used to mute icon when vol == 0
  }

  handleSlider = () => {
    // this.sliderRef.current?.classList.toggle("invisible");
    this.setState({ showSlider: !this.state.showSlider })
  }

  hideSlider = () => {
    this.setState({ showSlider: false })
  }

  render() {
    return (
      // <div id="menu-layer" className={this.state.visible ? '' : 'invisible'}>
      //   <div className="logo">GlubStep</div>
      <div id="menu-bar" className={this.state.visible ? '' : 'hidden'}>
        <div id="controls">
          <button id="play-button" className="icon-button" onClick={this.handlePlay}>
            {/* <svg id="pause-icon" className={`icon-button play-icon ${this.state.playing ? '' : 'hidden'}`} width="18.1px" height="22px" viewBox="0 0 18.1 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="5" height="22" rx="2" fill="white" />
              <rect x="12" width="5" height="22" rx="2" fill="white" />
            </svg> */}

            <svg id="pause-icon" className={`icon-button play-icon ${this.state.playing ? '' : 'hidden'}`} width="14.9px" height="19.3px" viewBox="0 0 14.9 19.3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.8,0h0.9c1,0,1.8,0.8,1.8,1.8v15.8c0,1-0.8,1.8-1.8,1.8H1.8c-1,0-1.8-0.8-1.8-1.8V1.8C0,0.8,0.8,0,1.8,0z" fill="white" />
              <path d="M12.3,0h0.9c1,0,1.8,0.8,1.8,1.8v15.8c0,1-0.8,1.8-1.8,1.8h-0.9c-1,0-1.8-0.8-1.8-1.8V1.8
		C10.5,0.8,11.3,0,12.3,0z" fill="white" />
            </svg>

            {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14.5px" height="16.4px" viewBox="0 0 14.5 16.4">
              <path d="M2,0h1c1.1,0,2,0.7,2,1.5V15c0,0.8-0.9,1.5-2,1.5H2c-1.1,0-2-0.7-2-1.5V1.5C0,0.7,0.9,0,2,0z" fill="white" />
              <path d="M11.5,0h1c1.1,0,2,0.7,2,1.5V15c0,0.8-0.9,1.5-2,1.5h-1c-1.1,0-2-0.7-2-1.5V1.5C9.5,0.7,10.4,0,11.5,0z" fill="white" />
            </svg> */}
            <svg id="play-icon" className={`icon-button play-icon ${this.state.playing ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="17px" viewBox="0 0 15 17">
              <path fill="white" d="M14.5,7.8L1.2,0.1C0.7-0.2,0,0.2,0,0.7v15.5c0,0.6,0.7,1,1.2,0.7l13.4-7.8C15.1,8.9,15.1,8.1,14.5,7.8z" />
            </svg>
          </button>
          {/* <div id="volume-placeholder"> */}
          <div id="volume-wrapper" onMouseEnter={this.handleSlider} onMouseLeave={this.handleSlider}>
            <button id="mute-button" className="icon-button" onClick={this.handleMute}>
              <svg id="muted-icon" className={`icon-button mute-icon ${this.state.muted ? '' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23.1px" height="24.7px" viewBox="0 0 23.1 24.7">
                <path d="M7.7,16.6H3.3c-0.6,0-1-0.4-1-1V9.5c0-0.6,0.5-1,1-1h0.2l13,12.8v2.4c0,0.9-1.1,1.3-1.8,0.6L7.7,16.6z M16.7,18V1
	c0-0.9-1.1-1.3-1.8-0.6L7.3,8.6H7.2L16.7,18z" fill="white" />
                <path d="M21.9,22.9c-0.3,0-0.6-0.1-0.8-0.3L0.3,2c-0.4-0.4-0.4-1.2,0-1.7c0.5-0.5,1.2-0.5,1.7,0l20.8,20.4c0.5,0.5,0.5,1.2,0,1.7
		C22.5,22.7,22.2,22.9,21.9,22.9z" fill="white" />
              </svg>
              <svg id="unmuted-icon" className={`icon-button mute-icon ${this.state.muted ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23.4px" height="25px" viewBox="0 0 23.4 25" >
                <path d="M16.8,18.1v-17c0-0.9-1.1-1.3-1.8-0.6L7.5,8.7H7.3H3.7H3.5c-0.6,0-1,0.4-1,1v6.1c0,0.6,0.5,1,1,1h4.4l7.2,7.8
		c0.6,0.6,1.8,0.2,1.8-0.6L16.8,18.1z" fill="white" />
                <path d="M20.1,17.9c-0.3,0-0.6-0.2-0.8-0.4c-0.4-0.5-0.3-1.1,0.2-1.5c1.1-0.9,1.7-2.2,1.7-3.6s-0.6-2.7-1.7-3.6
		c-0.5-0.4-0.5-1-0.2-1.5c0.4-0.5,1-0.5,1.5-0.2c1.5,1.3,2.4,3.2,2.4,5.2s-0.9,3.9-2.5,5.3C20.6,17.9,20.3,17.9,20.1,17.9z" fill="white" />
                <rect x="0.1" y="0.1" width="23.1" height="24.7" fill="none" />
                {/* <rect x="0.1" y="0.1" class="st1" width="23.1" height="24.7"/> */}
              </svg>
            </button>
            <input ref={this.sliderRef} id="volume-slider" name="volume-slider" type="range" min="0" max="1" defaultValue={this.state.setVolume} step="0.01"
              className={`${this.state.showSlider ? '' : 'transparent'}`}
              onChange={this.handleVolume}
            ></input>
          </div>
          {/* </div> */}
        </div>
        <div id="scene-buttons">
          <button className="button button-fill" onClick={this.handleScene('MoonJellies')}>moon jellies</button>
          <button className="button" onClick={this.handleScene('OpenSea')}>open sea</button>
          <button className="button" onClick={this.handleScene('CoralReef')}>coral reef</button>
        </div>
        <button id="info" className={`icon-button ${this.state.infoShown ? 'hidden' : ''}`} onClick={this.handleInfo}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24.2px" height="24.2px" viewBox="0 0 24.2 24.2">
            <path d="M12.1,2c5.6,0,10.1,4.5,10.1,10.1s-4.5,10.1-10.1,10.1S2,17.6,2,12.1S6.5,2,12.1,2 M12.1,0C5.4,0,0,5.4,0,12.1
		s5.4,12.1,12.1,12.1s12.1-5.4,12.1-12.1S18.7,0,12.1,0L12.1,0z" fill="white" />
            <path d="M12.1,5c0.4,0,0.7,0.1,1,0.4c0.3,0.3,0.4,0.6,0.4,1S13.3,7,13,7.3c-0.3,0.3-0.6,0.4-1,0.4c-0.4,0-0.7-0.1-1-0.4
	c-0.3-0.3-0.4-0.6-0.4-1s0.1-0.7,0.4-1C11.4,5.1,11.7,5,12.1,5z M10.8,18.9v-8.1H9.6V8.8h3.7v10H10.8z" fill="white" />
          </svg>
        </button>
      </div >
      // </div >
    )
  }
}

export default Menu