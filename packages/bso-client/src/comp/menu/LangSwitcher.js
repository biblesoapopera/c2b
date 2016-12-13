import React from 'react'
import LangSwitcherModal from '../modal/LangSwitcherModal'

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
      <div className="lang-switcher">
        <div className="lang" onClick={::this.show}>
          <div></div>
        </div>

        {this.state.visible &&
          <LangSwitcherModal
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
