import React from 'react'
import HamburgerModal from '../modal/HamburgerModal'

class Hamburger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  show() {
    this.setState({visible: true})
  }

  hide() {
    this.setState({visible: false})
  }

  render() {
    return (
      <div className="hamburger">
        <div className="inner" onClick={::this.show}>
          <div className="icon">
            <div></div>
          </div>
        </div>

        {this.state.visible &&
          <HamburgerModal
            api={this.props.api}
            hide={::this.hide}
          />
        }
      </div>
    )
  }
}

export default Hamburger
