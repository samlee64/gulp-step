import React from "react";
// import { connect } from 'react-redux'
import { store } from '../index'
import { changeToView } from '../actions'
import '../SplashModal.css';

type Props = {};

type State = {
  visible: boolean;
};

class SplashModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      visible: true
    }

    store.subscribe(() => {
      this.setState({ visible: store.getState().view === 'Splash' })
    })
  }

  enterMain = () => {
    // this.props.changeToView(this.state.input)

    store.dispatch(changeToView('Main')) // change store's view value to 'Main'

    // const visibility = 
    // this.setState({ visible: visibility })
  }

  render() {
    // if (this.state.visible) {
    return (
      <div id="splash-modal" className={this.state.visible ? '' : 'invisible'}
      // className="hidden"
      >
        <div className="modal-text">
          <div id="splash-logo" className="logo">GlubStep</div>
          <h1>Generative music powered by machine learning and marine life</h1>
          <p>Generative music powered by machine learning and marine life. Generative music powered by machine learning and marine life.</p>
          <button id="enter" className="button button-fill" onClick={this.enterMain}>Enter</button>
        </div>
      </div>
    )
  }
  //   return null
  // }
}

// export default connect(
//   null,
//   { changeToView },
// )(SplashModal)

export default SplashModal
