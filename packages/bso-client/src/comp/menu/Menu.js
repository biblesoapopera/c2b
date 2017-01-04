import React from 'react'

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="logo font-logo">C2B</div>

        <div className='items'>
          {this.props.buttons.map(button => button)}
        </div>
      </div>
    )
  }
}

export default Menu
