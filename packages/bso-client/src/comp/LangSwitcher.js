import React from 'react'
import LangSwitcherDropdown from './LangSwitcherDropdown'

class LangSwitcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  show() {
    this.setState({visible: true})
  }

  newLang(lang) {
    this.setState({visible: false})
    if (lang !== this.props.lang) this.props.switchLang(lang)
  }

  render() {
    return (
      <div className="lang-switcher font-menu">
        <div className="head" onClick={::this.show}>
          <img src="img/globe.png" />
        </div>

        {this.state.visible &&
          <LangSwitcherDropdown
            store={this.props.store}
            lang={this.props.lang}
            newLang={::this.newLang}
          />
        }
      </div>
    )
  }
}

export default LangSwitcher
