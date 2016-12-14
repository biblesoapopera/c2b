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

  setUser(user) {
    this.setState({visible: false})
    this.props.setUser(user)
  }

  tr(str) {
    return this.props.tr('login', str)
  }

  render() {
    return (
      <div className="login">
        <div className="btn font-menu" onClick={::this.show}>
          <div>{this.tr('login')}</div>
        </div>

        {this.state.visible &&
          <LoginModal
            setUser={::this.setUser}
            tr={::this.tr}
          />
        }
      </div>
    )
  }
}

export default Login
