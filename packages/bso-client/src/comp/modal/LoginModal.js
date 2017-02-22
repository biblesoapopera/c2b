import React from 'react'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      valid: false,
      loading: false,
      err: false
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

  async submit(evt) {
    evt.preventDefault()
    this.setState({
      loading: true,
      err: false
    })

    let result = await this.props.api.user.login(this.state.username, this.state.password)

    if (result) {
      this.props.api.user.set()
      this.setState({loading: false})
      this.props.hide()
    } else {
      this.setState({
        username: '',
        password: '',
        valid: false,
        loading: false,
        err: true
      })
    }
  }

  render() {
    return (
      <div className="modal login-modal" onClick={this.props.hide}>
        <div className="modal-inner">
          <form onClick={this.stopPropagation}>
            <label>
              {this.props.api.translate('login', 'username')}
              <input type="text" value={this.state.username} onChange={::this.usernameChange} />
            </label>
            <label>
              {this.props.api.translate('login', 'password')}
              <input type="password" value={this.state.password} onChange={::this.passwordChange} />
            </label>
            <div className="font3 error">{this.state.err && this.props.api.translate('login', 'login failed')}</div>
            <button
              disabled={(this.state.valid && !this.state.loading) ? false : 'disabled'}
              type="button"
              onClick={::this.submit}
            >
              {this.state.loading && '...'}
              {!this.state.loading && this.props.api.translate('login', 'login')}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginModal
