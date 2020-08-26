import React from 'react'
import './App.css'
import { ExampleClass } from './components/Example'

type Props = {}

type State = {}

class App extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = {}
  }


  render() {
    return (
      <>
        <div>Hello weary traveler Dumpus</div>
        <ExampleClass />
      </>
    )
  }
}

export default App
