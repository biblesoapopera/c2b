import React from 'react'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      valid: false
    }
  }

  usernameChange(evt) {
    let valid = false
    if (this.state.password && evt.target.value) valid = true
    this.setState({username: evt.target.value, valid: valid})
  }

  passwordChange(evt) {
    let valid = false
    if (this.state.username && evt.target.value) valid = true
    this.setState({password: evt.target.value, valid: valid})
  }

  stopPropagation(evt) {
    evt.stopPropagation()
  }

  submit(evt) {
    evt.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <div className="modal login-modal" onClick={() => this.props.setUser()}>
        <div>
          <form onClick={this.stopPropagation}>
            <label>
              {this.props.tr('username')}
              <input type="text" value={this.state.username} onChange={::this.usernameChange} />
            </label>
            <label>
              {this.props.tr('password')}
              <input type="password" value={this.state.password} onChange={::this.passwordChange} />
            </label>
            <button
              disabled={this.state.valid ? false : 'disabled'}
              type="button"
              onClick={::this.submit}
            >
              {this.props.tr('login')}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginModal
