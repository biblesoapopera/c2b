import React from 'react'
import LangSwitcherItem from './LangSwitcherItem'

class LangSwitcherModal extends React.Component {
  render() {
    return (
      <div className="modal lang-switcher-modal" onClick={() => this.props.newLang(this.props.lang)}>
        <div className="modal-inner">
          <ul>
            {this.props.api.lang.listNames().map((item, key) => {
              return <LangSwitcherItem
                key={key}
                selected={item[0] === this.props.lang}
                name={item[1]}
                value={item[0]}
                newLang={this.props.newLang}
              />
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default LangSwitcherModal
