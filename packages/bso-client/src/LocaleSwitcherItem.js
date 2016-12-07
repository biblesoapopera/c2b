import React from 'react'

class LocaleSwitcherItem extends React.Component {
  select() {
    this.props.hide()
    this.props.switchLocale(this.props.value)
  }

  render() {
    return (
      <li
        onClick={::this.select}
        className={this.props.selected && 'selected'}
      >
          {this.props.name}
      </li>
    )
  }
}

export default LocaleSwitcherItem
