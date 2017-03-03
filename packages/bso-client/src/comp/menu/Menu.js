import React from 'react'

class Menu extends React.Component {
  home(){
    this.props.api.go(['choose-episode'])
  }

  render() {
    return (
      <div className="menu">
        <div className="logo" onClick={::this.home}>
          <div className="font-logo">C2B</div>
        </div>

        <div className='items'>
          {this.props.buttons.map(button => button)}
        </div>
      </div>
    )
  }
}

export default Menu
