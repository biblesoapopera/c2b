import React from 'react'
import LangSwitcher from './LangSwitcher'

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="logo font-logo">C2B</div>
        <LangSwitcher
          lang={this.props.lang}
          country={this.props.country}
          switchLang={this.props.switchLang}
          store={this.props.store}
        />
      </div>
    )
  }
}

export default Menu
