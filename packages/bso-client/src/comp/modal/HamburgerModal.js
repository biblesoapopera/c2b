import React from 'react'

class HamburgerModal extends React.Component {
  logout() {
    this.props.hide()
    this.props.api.user.logout()
  }

  render() {
    return (
      <div className="modal hamburger-modal" onClick={this.props.hide}>
        <div className="modal-inner">
          <ul>
            <li
              onClick={::this.logout}
              className={'font3'}
            >
              {this.props.api.translate('hamburger', 'logout')}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default HamburgerModal
