import React from 'react';
// import { connect } from 'react-redux'
import './App.css';
import SplashModal from './components/SplashModal';
import Menu from './components/Menu';
import InfoModal from './components/InfoModal';
import { store } from './index'
import { toggleInfo } from './actions'

type Props = {};

type State = {
  video: string
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      video: 'MoonJellies'
    };

    // const backgrounds = {
    //   'MoonJellies': './jelly.png',
    //   'OpenSea': './opensea.png',
    //   'CoralReef': './reef.png'
    // }

    store.subscribe(() => {
      // let selectedScene = store.getState().scene
      // console.log(store.getState().scene)

      this.setState({ video: store.getState().scene })
    })
  }

  exitInfo = () => {
    if (store.getState().infoShown) {
      store.dispatch(toggleInfo())
    }
  }

  render() {
    let backgroundClass = 'moon-bg'
    if (this.state.video === 'MoonJellies') {
      backgroundClass = 'moon-bg'
    } else if (this.state.video === 'OpenSea') {
      backgroundClass = 'opensea-bg'
    } else if (this.state.video === 'CoralReef') {
      backgroundClass = 'coralreef-bg'
    }

    return (
      <>
        <SplashModal />
        <Menu />
        <InfoModal />
        <div id="video-bg" className={backgroundClass}
          // style={{ backgroundImage: 'url(' + this.state.video + ')' }}
          onClick={this.exitInfo}></div>
      </>
    )
  }
}

export default App;
