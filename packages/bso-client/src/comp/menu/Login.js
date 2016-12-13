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

  newUser(user) {
    this.setState({visible: false})
    this.props.setUser(user)
  }

  render() {
    return (
      <div className="login">
        <div className="lang" onClick={::this.show}>
          <div></div>
        </div>

        {this.state.visible &&
          <LoginModal
            newUser={::this.newUser}
          />
        }
      </div>
    )
  }
}

export default Login
