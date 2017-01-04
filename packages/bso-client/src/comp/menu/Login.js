import React from 'react'
import LoginModal from '../modal/LoginModal'

class Login extends React.Component {
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
      <div className="login">
        <div className="btn font-menu" onClick={::this.show}>
          <div>{this.props.api.translate('login', 'login')}</div>
        </div>

        {this.state.visible &&
          <LoginModal
            api={this.props.api}
            hide={::this.hide}
          />
        }
      </div>
    )
  }
}

export default Login
