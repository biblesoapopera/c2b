import React from 'react'
import Background from './Background'
import Menu from './menu/Menu'
import Splash from './Splash'
import EpisodeChooser from './episodeChooser/EpisodeChooser'
import DeliveryChooser from './DeliveryChooser'
import PlayerContainer from './player/PlayerContainer'
import Editor from './editor/Editor'
import LangSwitcher from './menu/LangSwitcher'
import Login from './menu/Login'
import Hamburger from './menu/Hamburger'
import Edit from './menu/Edit'
import Loading from './Loading'
import Error from './Error'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      err: false,
      country: 'au',
      lang: 'en',
      menu: [],
      user: false,
      //route: []
      //route: ['choose-episode']
      route: ['choose-delivery', '5861e8d8e3ccf715b416561f']
      //route: ['player', '5861e8d8e3ccf715b416561f']
      //route: ['editor']
    }

    let api = {}
    Object.keys(this.props.api).forEach(key => api[key] = this.props.api[key])

    api.lang.switch = async lang => {
      this.setState({
        loading: true
      })
      await api.lang.read(lang)
      this.setState({
        loading: false,
        lang: lang
      })
    }

    api.go = to => {
      this.setState({route: to})
    }

    api.user.set = async () => {
      let user = await api.user.active()
      this.setState({user: user})
    }

    let preservedLogout = this.props.api.user.logout
    api.user.logout = async () => {
      this.setState({loading: true})

      let result = await preservedLogout()

      if (!result) {
        this.setState({
          loading: false,
          err: 'logout error'
        })
      } else {
        await api.user.set()
        this.setState({
          loading: false
        })
      }
    }

    api.menu = buttons => {
      this.setState({menu: buttons})
    }

    api.translate = (context, str) =>{
      return this.props.api.translate(this.state.lang, context, str)
    }

    this.api = api
  }

  componentDidMount() {
    this.api.user.set()
  }

  render() {
    let route = this.state.route[0]
    let content

    let buttons = this.state.menu.map(btn => {
      if (btn === 'lang'){
        return <LangSwitcher key="lang" lang={this.state.lang} api={this.api} />
      } else if (btn === 'login') {
        return <Login key="login" api={this.api}/>
      } else if (btn === 'hamburger') {
        return <Hamburger key="hamburger" api={this.api}/>
      } else if (btn === 'edit') {
        return <Edit key="edit" api={this.api}/>
      } else if (typeof btn !== 'string') {
        return btn
      }
    })

    if (this.state.loading && !this.state.err) {
      content = <Loading />
    } else if (this.state.err) {
      content = <Error err={this.state.err}/>
    } else if (route === void 0) {
      content = (
        <Splash
          api={this.api}
          user={this.state.user}
        />
      )
    } else if (route === 'choose-episode') {
      content = (
        <EpisodeChooser
          lang={this.state.lang}
          api={this.api}
        />
      )
    } else if (route === 'choose-delivery') {
      content = (
        <DeliveryChooser
          api={this.api}
          episode={this.state.route[1]}
        />
      )
    } else if (route === 'player') {
      content = (
        <PlayerContainer
          episode={this.state.route[1]}
          api={this.api}
        />
      )
    } else if (route === 'editor') {
      content = (
        <Editor
          api={this.api}
          lang={this.state.lang}
        />
      )
    }

    return (
      <div className="app">
        <Background />

        <Menu
          api={this.api}
          buttons={buttons}
        />

        {content}
      </div>
    );
  }
}

export default App
