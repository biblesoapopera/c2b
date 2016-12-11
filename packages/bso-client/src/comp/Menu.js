import React from 'react'
import LangSwitcher from './LangSwitcher'

class Menu extends React.Component {
  edit(){
    this.props.go(['editor'])
  }

  editAudio(){
    this.props.go(['audio-editor'])
  }

  editSeries(){
    this.props.go(['series-editor'])
  }

  editEpisode(){
    this.props.go(['episode-editor'])
  }

  render() {
    let items = []

    if (this.props.route[0] === 'splash') items = ['lang', 'login']
    if (this.props.route[0] === 'choose-episode') items = ['edit', 'lang']
    if (this.props.route[0] === 'choose-delivery') items = ['lang']
    if (this.props.route[0] === 'player') items = ['lang']
    if (this.props.route[0] === 'editor') items = ['edit-audio', 'edit-series', 'edit-episode']
    if (this.props.route[0] === 'audio-editor') items = ['edit', 'edit-series', 'edit-episode']

    return (
      <div className="menu">
        <div className="logo font-logo">C2B</div>

        <div className='items'>
          {items.indexOf('edit') !== -1 &&
            <div className="item edit" onClick={::this.edit}>
              <div></div>
            </div>
          }

          {items.indexOf('lang') !== -1 &&
            <LangSwitcher
              lang={this.props.lang}
              switchLang={this.props.switchLang}
              store={this.props.store}
            />
          }

          {items.indexOf('edit-audio') !== -1 &&
            <div className="item edit-audio" onClick={::this.editAudio}>
              <div></div>
            </div>
          }

          {items.indexOf('edit-series') !== -1 &&
            <div className="item edit-series" onClick={::this.editSeries}>
              <div></div>
            </div>
          }

          {items.indexOf('edit-episode') !== -1 &&
            <div className="item edit-episode" onClick={::this.editEpisode}>
              <div></div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Menu
