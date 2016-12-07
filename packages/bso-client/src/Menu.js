import React from 'react'
import LocaleSwitcher from './LocaleSwitcher'

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="logo font-logo">C2B</div>
        <LocaleSwitcher locale={this.props.locale} switchLocale={this.props.switchLocale} />
      </div>
    )
  }
}

export default Menu
