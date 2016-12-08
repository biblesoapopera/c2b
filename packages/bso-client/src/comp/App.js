import React from 'react'
import Background from './Background'
import Menu from './Menu'
import Splash from './Splash'
import EpisodeChooser from './EpisodeChooser'
import DeliveryChooser from './DeliveryChooser'
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
      route: ['choose-delivery', 4]
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

        <Menu lang={this.state.lang} store={store} switchLang={::this.switchLang} />

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

        {route === 'episode' &&
          <div></div>
        }
      </div>
    );
  }
}

export default App
