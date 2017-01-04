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
    if (lang !== this.props.lang) this.props.api.lang.switch(lang)
  }

  render() {
    return (
      <div className="lang-switcher">
        <div className="inner" onClick={::this.show}>
          <div className="icon">
            <div></div>
          </div>
        </div>

        {this.state.visible &&
          <LangSwitcherModal
            api={this.props.api}
            lang={this.props.lang}
            newLang={::this.newLang}
          />
        }
      </div>
    )
  }
}

export default LangSwitcher
