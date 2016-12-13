import React from 'react'

class LocaleSwitcherItem extends React.Component {
  select() {
    this.props.newLang(this.props.value)
  }

  render() {
    return (
      <li
        onClick={::this.select}
        className={'font3 ' + (this.props.selected ? 'selected' : '')}
      >
          {this.props.name}
      </li>
    )
  }
}

export default LocaleSwitcherItem
