import React from 'react'
import Background from './Background'
import Menu from './Menu'
import Splash from './Splash'
import EpisodeChooser from './EpisodeChooser'
import DeliveryChooser from './DeliveryChooser'
import PlayerContainer from './PlayerContainer'
import Editor from './editor/Editor'
import AudioEditor from './editor/AudioEditor'
import translate from '../translate'
import store from '../store'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: 'australia',
      lang: 'en',
      //route: ['splash']
      //route: ['choose-episode']
      //route: ['choose-delivery', 4]
      //route: ['player', 4]
      route: ['editor']
    }

    this.switchLang(this.state.lang)
  }

  async switchLang(lang) {
    await store.lang.load(lang)
    this.setState({lang: lang})
  }

  go(to) {
    this.setState({route: to})
  }

  tr(lang) {
    return (context, str) => {
      return translate(lang, context, str)
    }
  }

  render() {
    let route = this.state.route[0]

    return (
      <div className="app">
        <Background />

        <Menu
          go={::this.go}
          lang={this.state.lang}
          store={store}
          switchLang={::this.switchLang}
          route={this.state.route}
        />

        {route === 'splash' &&
          <Splash go={::this.go} tr={this.tr(this.state.lang)}/>
        }

        {route === 'choose-episode' &&
          <EpisodeChooser
            lang={this.state.lang}
            switchLang={::this.switchLang}
            go={::this.go}
            store={store}
            tr={this.tr(this.state.lang)}
          />
        }

        {route === 'choose-delivery' &&
          <DeliveryChooser
            go={::this.go}
            episode={this.state.route[1]}
            tr={this.tr(this.state.lang)}
          />
        }

        {route === 'player' &&
          <PlayerContainer
            go={::this.go}
            episode={this.state.route[1]}
            tr={this.tr(this.state.lang)}
            store={store}
          />
        }

        {route === 'editor' &&
          <Editor
            go={::this.go}
            tr={this.tr(this.state.lang)}
          />
        }

        {route === 'audio-editor' &&
          <AudioEditor
            lang={this.state.lang}
            tr={this.tr(this.state.lang)}
            store={store}
          />
        }
      </div>
    );
  }
}

export default App
