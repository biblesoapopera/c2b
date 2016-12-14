import React from 'react'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        username: '',
        password: ''
      },
      valid: false
    }
  }

  usernameChange(evt) {
    this.setState({data: {username: evt.target.value}})
  }

  passwordChange(evt) {
    this.setState({data: {password: evt.target.value}})
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
              <input type="text" value={this.state.data.username} onChange={::this.usernameChange} />
            </label>
            <label>
              {this.props.tr('password')}
              <input type="password" value={this.state.data.password} onChange={::this.passwordChange} />
            </label>
            <button
              disabled={this.state.valid ? true : 'disabled'}
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
