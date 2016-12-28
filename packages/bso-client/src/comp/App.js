import React from 'react'
import Background from './Background'
import Menu from './menu/Menu'
import Splash from './Splash'
import EpisodeChooser from './episodeChooser/EpisodeChooser'
import DeliveryChooser from './DeliveryChooser'
import PlayerContainer from './player/PlayerContainer'
import Editor from './editor/Editor'
import AudioEditor from './editor/AudioEditor'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: 'au',
      lang: 'en',
      menu: [],
      user: false,
      //route: []
      //route: ['choose-episode']
      //route: ['choose-delivery', 4]
      route: ['player', '5861e8d8e3ccf715b416561f']
      //route: ['editor']
    }

    let api = {}
    Object.keys(this.props.api).forEach(key => api[key] = this.props.api[key])

    api.lang.switch = async lang => {
      await api.lang.read(lang)
      this.setState({lang: lang})
    }

    api.go = to => {
      this.setState({route: to})
    }

    api.loading = {
      show: () => this.setState({loading: true}),
      hide: () => this.setState({loading: false})
    }

    api.user.set = () => {
      this.setState(api.user.active)
    }

    api.menu = buttons => {
      this.setState({menu: buttons})
    }

    api.translate = (context, str) =>{
      this.props.api.translate(this.state.lang, context, str)
    }

    this.api = api
  }

  render() {
    let route = this.state.route[0]

    return (
      <div className="app">
        <Background />

        <Menu
          buttons={this.state.menu}
          lang={this.state.lang}
          api={this.api}
        />

        {route === void 0 &&
          <Splash
            api={this.api}
          />
        }

        {route === 'choose-episode' &&
          <EpisodeChooser
            lang={this.state.lang}
            api={this.api}
          />
        }

        {route === 'choose-delivery' &&
          <DeliveryChooser
            api={this.api}
            episode={this.state.route[1]}
          />
        }

        {route === 'player' &&
          <PlayerContainer
            episode={this.state.route[1]}
            api={this.api}
          />
        }

        {route === 'editor' &&
          <Editor
            api={this.api}
            lang={this.state.lang}
          />
        }

        {route === 'audio-editor' &&
          <AudioEditor
            api={this.api}
          />
        }
      </div>
    );
  }
}

export default App
