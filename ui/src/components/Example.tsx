import React from "react"

type Props = {}

type State = {}

export class ExampleClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <>
        An example component for you
      </>
    )
  }
}