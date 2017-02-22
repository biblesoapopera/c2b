import React from 'react'

class Splash extends React.Component {
  componentWillMount() {
    this.props.api.menu(this.buttons(this.props.user.roles))
  }

  buttons(roles) {
    let buttons = ['lang']

    if (!roles) {
      buttons.push('login')
      return buttons
    } else if (roles.length === 1 && roles[0] === 'guest') {
      buttons.push('login')
    } else {
      buttons.push('hamburger')
    }

    if (roles.indexOf('editor') !== -1) buttons.unshift('edit')

    return buttons
  }

  enter() {
    this.props.api.go(['choose-episode'])
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.roles === nextProps.user.roles) return
    this.props.api.menu(this.buttons(nextProps.user.roles))
  }

  render() {
    return (
      <div className="splash">
        <h1 className="font0">{this.props.api.translate('splash', 'Cursed to Bless')}</h1>
        <h2 className="font1">{this.props.api.translate('splash', 'a bible teaching drama')}</h2>
        <div className="btn font2" onClick={::this.enter}>{this.props.api.translate('splash', 'join the story')}</div>
      </div>
    )
  }
}

export default Splash
