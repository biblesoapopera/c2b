import React from 'react'

class Splash extends React.Component {
  componentWillMount() {
    this.props.menu([
      {name: 'lang'},
      {name: 'login'}
    ])
  }

  enter() {
    this.props.go(['choose-episode'])
  }

  tr(str) {
    return this.props.tr('splash', str)
  }

  render() {
    return (
      <div className="splash">
        <h1 className="font0">{this.tr('Cursed to Bless')}</h1>
        <h2 className="font1">{this.tr('a bible teaching drama')}</h2>
        <div className="btn font2" onClick={::this.enter}>{this.tr('join the story')}</div>
      </div>
    )
  }
}

export default Splash
