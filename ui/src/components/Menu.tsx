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
};

class Menu extends React.Component<Props, State> {
  sliderRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false,
      playing: true,
      setVolume: 1,
      muted: true,
      showSlider: false
    }

    this.sliderRef = React.createRef();

    store.subscribe(() => {
      this.setState({
        visible: store.getState().view === 'Main',
        // playing: store.getState().playing,
        // storedVolume: store.getState().storedVolume,
        muted: store.getState().muted
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
    var pauseIcon =
      <svg width="18.1px" height="22px" viewBox="0 0 18.1 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="5" height="22" rx="2" fill="white" />
        <rect x="12" width="5" height="22" rx="2" fill="white" />
      </svg>
    // <svg>
    //   <use href={'../assets/play.svg'}></use>
    // </svg>
    var playIcon =
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18.1px" height="20.6px" viewBox="0 0 18.1 20.6">
        <path fill="white" d="M17.6,9.5L1.4,0.1C0.8-0.2,0,0.2,0,0.9v18.8c0,0.7,0.8,1.2,1.4,0.8l16.2-9.4C18.3,10.8,18.3,9.9,17.6,9.5z" />
      </svg>
    // <svg>
    //   <use href={'../assets/pause.svg#Layer_1'}></use>
    // </svg>
    // var playButton = <button id="pause" className="icon-button" onClick={this.handlePlay}>{this.state.playing ? playIcon : pauseIcon}</button>

    var mutedIcon =
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28.9px" height="30.9px" viewBox="0 0 28.9 30.9">
        <path d="M9.7,20.8H4.2c-0.7,0-1.3-0.5-1.3-1.2v-7.7c0-0.7,0.6-1.2,1.3-1.2h0.3l16.3,16v3c0,1.1-1.4,1.6-2.2,0.8
      L9.7,20.8z M20.9,22.5V1.2c0-1.1-1.4-1.6-2.2-0.8L9.2,10.7H9L20.9,22.5z" fill="white" />
        <path d="M27.4,28.6c-0.4,0-0.8-0.1-1-0.4L0.4,2.5C-0.1,2-0.1,1,0.4,0.4c0.6-0.6,1.5-0.6,2.1,0L28.5,26
      	c0.6,0.6,0.6,1.5,0,2.1C28.2,28.4,27.8,28.6,27.4,28.6z" fill="white" />
      </svg>
    var unmutedIcon =
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28.9px" height="30.9px" viewBox="0 0 28.9 30.9">
        <path d="M20.9,22.5V1.2c0-1.1-1.4-1.6-2.2-0.8L9.2,10.7H9H4.5H4.2c-0.7,0-1.3,0.5-1.3,1.2v7.7c0,0.7,0.6,1.2,1.3,1.2
		h5.5l9,9.8c0.8,0.8,2.2,0.3,2.2-0.8L20.9,22.5z" fill="white" />
        <path d="M25,22.3c-0.4,0-0.8-0.2-1-0.5c-0.5-0.6-0.4-1.4,0.2-1.9c1.4-1.1,2.1-2.8,2.1-4.5s-0.8-3.4-2.1-4.5
		C23.6,10.4,23.6,9.6,24,9c0.5-0.6,1.3-0.6,1.9-0.2c1.9,1.6,3,4,3,6.5s-1.1,4.9-3.1,6.6C25.6,22.2,25.3,22.3,25,22.3z" fill="white" />
        <rect width="28.9" height="30.9" fill="none" />
      </svg>

    return (
      <div id="menu-bar" className={this.state.visible ? '' : 'invisible'}>
        <div id="menu-logo" className="logo">GlubStep</div>
        <div id="scene-buttons">
          <button className="button button-fill" onClick={this.handleScene('MoonJellies')}>moon jellies</button>
          <button className="button" onClick={this.handleScene('OpenSea')}>open sea</button>
          <button className="button" onClick={this.handleScene('CoralReef')}>coral reef</button>
        </div>
        <div id="controls">
          {/* <div>{playButton}</div> */}
          <button id="play-button" className="icon-button" onClick={this.handlePlay}>
            {this.state.playing ? pauseIcon : playIcon}
          </button>
          <div id="volume-placeholder">
            {/* <div>{soundButton}</div> */}
            <div id="volume-wrapper" onMouseEnter={this.handleSlider} onMouseLeave={this.handleSlider}>
              <button id="mute-button" className="icon-button" onClick={this.handleMute}>
                {(this.state.muted || this.state.setVolume == 0) ? mutedIcon : unmutedIcon}
              </button>
              <input ref={this.sliderRef} id="volume-slider" name="volume-slider" type="range" min="0" max="1" defaultValue="1" step="0.01"
                className={`${this.state.showSlider ? '' : 'transparent'}`}
                onChange={this.handleVolume}
              ></input>
            </div>
          </div>
          <button id="info" className="icon-button" onClick={this.handleInfo}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17.4018" cy="16.5982" r="15.0982" stroke="white" strokeWidth="3" />
              <path d="M17.3705 7.69543C17.8392 7.69543 18.2377 7.8634 18.5658 8.19934C18.9017 8.52747 19.0697 8.9259 19.0697 9.39465C19.0697 9.8634 18.9017 10.2657 18.5658 10.6017C18.2377 10.9298 17.8392 11.0939 17.3705 11.0939C16.9017 11.0939 16.4994 10.9298 16.1635 10.6017C15.8353 10.2657 15.6713 9.8634 15.6713 9.39465C15.6713 8.9259 15.8353 8.52747 16.1635 8.19934C16.4994 7.8634 16.9017 7.69543 17.3705 7.69543ZM15.8588 25.1095V14.9611H14.2533V12.5587H18.8236V25.1095H15.8588Z" fill="white" />
            </svg>
          </button>
        </div>
      </div >
    )
  }
}

export default Menu