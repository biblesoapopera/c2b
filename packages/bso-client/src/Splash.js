import React from 'react'
import getTranslateFn from './i18n/getTranslateFn'

class Splash extends React.Component {
  enter() {
    this.props.go(['choose-episode'])
  }

  render() {
    let tr = getTranslateFn(this.props.locale, 'splash')

    return (
      <div className="splash">
        <h1 className="font0">{tr('Cursed to Bless')}</h1>
        <h2 className="font1">{tr('a bible teaching drama')}</h2>
        <div className="btn font2" onClick={::this.enter}>{tr('join the story')}</div>
      </div>
    )
  }
}

export default Splash
