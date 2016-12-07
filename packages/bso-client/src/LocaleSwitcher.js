import React from 'react'
import store from './i18n/store'
import LocaleSwitcherItem from './LocaleSwitcherItem'

class LocaleSwitcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  show() {
    this.setState({visible: true})
  }

  hide() {
    this.setState({visible: false})
  }

  render() {
    return (
      <div className="locale-switcher font-menu">
        <div className="head" onClick={::this.show}>
          <img src="img/globe.png" />{this.props.locale.toUpperCase()}<img src="img/down.png" />
        </div>

        {this.state.visible &&
          <div className="dropdown" onClick={::this.hide}>
            <div>
              <ul>
                {Object.keys(store).map(key => {
                  return <LocaleSwitcherItem
                    key={key}
                    selected={key === this.props.locale}
                    name={store[key].name}
                    value={key}
                    switchLocale={this.props.switchLocale}
                    hide={::this.hide}
                  />
                })}
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default LocaleSwitcher
