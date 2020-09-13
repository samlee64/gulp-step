import React from "react";
// import { connect } from 'react-redux'
import { store } from '../index'
import { toggleInfo, changeToScene } from '../actions'
import '../Menu.css';

type Props = {};

type State = {
  visible: boolean;
};

class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false
    }

    store.subscribe(() => {
      this.setState({ visible: store.getState().view === 'Main' })
    })
  }

  selectScene = (scene: string) => (event: any) => {
    store.dispatch(changeToScene(scene))

    // document.getElementById('scene-buttons').querySelectorAll('*').clas
    // document.querySelectorAll('#scene-buttons button').classList. 
    event.target.parentNode.childNodes.forEach(
      (btn: { classList: { remove: (arg0: string) => any; }; }) => btn.classList.remove("button-fill"))
    event.target.classList.add('button-fill')
  }

  showInfo = () => {
    store.dispatch(toggleInfo()) // change store's infoShown value
    // console.log(store.getState().infoShown)
  }

  render() {
    // if (this.state.visible) {
    return (
      <div id="menu-bar" className={this.state.visible ? '' : 'invisible'}
      // className="hidden"
      >
        <div id="menu-logo" className="logo">GlubStep</div>
        <div id="scene-buttons">
          <button id="moon-btn" className="button button-fill" onClick={this.selectScene('MoonJellies')}>moon jellies</button>
          <button className="button" onClick={this.selectScene('OpenSea')}>open sea</button>
          <button className="button" onClick={this.selectScene('CoralReef')}>coral reef</button>
        </div>
        <div>
          <button id="pause" className="icon-button">
            <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="5" height="22" rx="2" fill="white" />
              <rect x="12" width="5" height="22" rx="2" fill="white" />
            </svg>
          </button>
          <button id="mute" className="icon-button">
            <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2.12099" y1="3.03721" x2="28.0372" y2="29.879" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <path fillRule="evenodd" clipRule="evenodd" d="M9.43866 21.848H4.19298C3.53412 21.848 3 21.3159 3 20.6596V12.9347C3 12.2783 3.53412 11.7462 4.19298 11.7462H4.51358L20 27.7857V30.8092C20 31.9095 18.6283 32.419 17.9052 31.5872L9.43866 21.848ZM20 23.4666V2.19083C20 1.09046 18.6283 0.581009 17.9052 1.41281L8.92208 11.7462H8.68371L20 23.4666Z" fill="white" />
            </svg>
          </button>
          <button id="info" className="icon-button" onClick={this.showInfo}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17.4018" cy="16.5982" r="15.0982" stroke="white" strokeWidth="3" />
              <path d="M17.3705 7.69543C17.8392 7.69543 18.2377 7.8634 18.5658 8.19934C18.9017 8.52747 19.0697 8.9259 19.0697 9.39465C19.0697 9.8634 18.9017 10.2657 18.5658 10.6017C18.2377 10.9298 17.8392 11.0939 17.3705 11.0939C16.9017 11.0939 16.4994 10.9298 16.1635 10.6017C15.8353 10.2657 15.6713 9.8634 15.6713 9.39465C15.6713 8.9259 15.8353 8.52747 16.1635 8.19934C16.4994 7.8634 16.9017 7.69543 17.3705 7.69543ZM15.8588 25.1095V14.9611H14.2533V12.5587H18.8236V25.1095H15.8588Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
  //   return null
  // }
}

export default Menu