import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { toggleInfo, changeToScene, toggleMute } from '../../state/actions';
import '../../css/Menu.css';

const playIcon = require('../../assets/play.svg');
const pauseIcon = require('../../assets/pause.svg');
const mutedIcon = require('../../assets/muted.svg');
const unmutedIcon = require('../../assets/unmuted.svg');
const infoIcon = require('../../assets/info.svg');

interface MenuProps {
  view: string;
  scene: string;
  muted: boolean;
  infoShown: boolean;
  playCb: Function;
  pauseCb: Function;
  volumeCb: Function;
  scenesInfo: { [key: string]: any };
  toggleInfo: Function;
  changeToScene: Function;
  toggleMute: Function;
}

const Menu = (props: MenuProps) => {
  const {
    view,
    scene,
    muted,
    infoShown,
    scenesInfo
  } = props;

  const sliderRef = useRef<HTMLInputElement>(null);
  const sceneButtonsRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(true);
  const [stateVolume, setStateVolume] = useState(0.66);
  const [showSlider, setShowSlider] = useState(false);

  // on mount add button fill to default scene button
  useEffect(() => {
    let storeScene = scene;
    if (sceneButtonsRef.current != null) {
      const children = sceneButtonsRef.current.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].id == storeScene) children[i].classList.add('label-button-fill');
      }
    }
  }, []);

  const handleScene = (scene: string) => (event: any) => {
    props.changeToScene(scene);
    event.target.parentNode.childNodes.forEach(
      (btn: { classList: { remove: (arg0: string) => any; }; }) => btn.classList.remove('label-button-fill')
    )
    event.target.classList.add('label-button-fill');
    setPlaying(true);
  }

  const handleInfo = () => {
    props.toggleInfo(); // change store's infoShown value
  }

  const handlePlay = () => {
    playing ? props.pauseCb() : props.playCb(); // call play function via props from App
    setPlaying(!playing); // toggle local playing for icon toggle (instead of sending to store and subscribing)
  }

  const handleMute = () => {
    props.toggleMute();
    var val = muted ? stateVolume : 0; // clicking sound icon sets (future) slider value to 0
    if (sliderRef.current != null) sliderRef.current.value = val.toString();  // actually set slider value
  }

  const handleVolume = (event: any) => {
    if (muted) props.toggleMute(); // if muted, unmute when you adjust slider
    props.volumeCb(event.target.value);  // call adjust volume function via props from App
    setStateVolume(event.target.value); // store volume in state when you manually adjust slider
  }

  const handleSlider = () => {
    setShowSlider(!showSlider);
  }

  return (
    <div id="menu-bar" className={view == 'Main' ? '' : 'hidden'}>
      <div id="controls">
        <button id="play-button" className="icon-button" onClick={handlePlay}>
          <img src={pauseIcon} id="pause-icon" className={`icon-button play-icon ${playing ? '' : 'hidden'}`} width="15px" />
          <img src={playIcon} id="play-icon" className={`icon-button play-icon ${playing ? 'hidden' : ''}`} width="15px" />
        </button>
        <div id="volume-wrapper" onMouseEnter={handleSlider} onMouseLeave={handleSlider}>
          <button id="mute-button" className="icon-button" onClick={handleMute}>
            <img src={mutedIcon} id="muted-icon" className={`icon-button mute-icon ${muted || stateVolume == 0 ? '' : 'hidden'}`} width="24px" />
            <img src={unmutedIcon} id="unmuted-icon" className={`icon-button mute-icon ${muted || stateVolume == 0 ? 'hidden' : ''}`} width="24px" />
          </button>
          <input ref={sliderRef} id="volume-slider" name="volume-slider" type="range" min="0" max="1" defaultValue={stateVolume} step="0.01"
            className={`${showSlider ? '' : 'transparent'}`}
            onChange={handleVolume}
          ></input>
        </div>
      </div>
      <div ref={sceneButtonsRef} id="scene-buttons">
        {Object.keys(scenesInfo).map(key =>
          <button key={key} id={key} className="label-button" onClick={handleScene(key)}>{scenesInfo[key].label}</button>
        )}
      </div>
      <button id="info" className={`icon-button ${infoShown ? 'hidden' : ''}`} onClick={handleInfo}>
        <img src={infoIcon} width="22px" />
      </button>
    </div >
  )
}

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

const mapDispatchToProps = (dispatch: Function) => {
  return {
    toggleInfo: () => { dispatch(toggleInfo()); },
    changeToScene: (scene: string) => { dispatch(changeToScene(scene)); },
    toggleMute: () => { dispatch(toggleMute()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);