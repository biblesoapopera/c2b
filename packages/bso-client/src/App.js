import React from 'react'
import Background from './Background'
import Menu from './Menu'
import Splash from './Splash'
import EpisodeChooser from './EpisodeChooser'
import DeliveryChooser from './DeliveryChooser'
import loadLocale from './i18n/loadLocale'
import isLocaleLoaded from './i18n/isLocaleLoaded'
import series from './series/store'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: 'en-au',
      route: ['splash']
      //route: ['choose-delivery', 0, 1]
    }

    this.switchLocale = this.switchLocale.bind(this)
    this.go = this.go.bind(this)
  }

  switchLocale(locale) {
    if (!isLocaleLoaded(locale)) {
      loadLocale(locale).then(() => this.setState({locale: locale}))
    } else {
      this.setState({locale: locale})
    }
  }

  go(to) {
    this.setState({route: to})
  }

  render() {
    let route = this.state.route[0]

    return (
      <div className="app">
        <Background />

        <Menu locale={this.state.locale} switchLocale={this.switchLocale} />

        {route === 'splash' &&
          <Splash locale={this.state.locale} go={this.go} />
        }

        {route === 'choose-episode' &&
          <EpisodeChooser locale={this.state.locale} go={this.go} series={series}/>
        }

        {route === 'choose-delivery' &&
          <DeliveryChooser locale={this.state.locale} go={this.go} series={this.state.route[1]} episode={this.state.route[2]}/>
        }

        {route === 'episode' &&
          <div></div>
        }
      </div>
    );
  }
}

export default App
