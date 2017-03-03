import React from 'react'
import Series from './Series'
import Loading from '../Loading'
import Error from '../Error'
import LangSwitcherModal from '../modal/LangSwitcherModal'

class EpisodeChooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEpisode: false,
      seriesData: false,
      lang: this.props.lang,
      err: false,
      switchLangVisible: false
    }
  }

  componentWillMount() {
    this.props.api.menu(['lang', 'hamburger'])
  }

  async componentDidMount() {
    let res = await this.props.api.series.readLangPublished(this.props.lang)
    if (res.status === 200) {
      this.setState({seriesData: res.body})
    } else {
      this.setState({err: res})
    }
  }

  select(seriesNum, episodeNum) {
    this.setState({
      selectedEpisode: {series: seriesNum, episode:episodeNum}
    })
  }

  deselect() {
    this.setState({selectedEpisode: false})
  }

  play() {
    this.props.api.go([
      'choose-delivery',
      this.state.seriesData[this.state.selectedEpisode.series].episodes[this.state.selectedEpisode.episode].id
    ])
  }

  showSwitchLang() {
    this.setState({switchLangVisible: true})
  }

  newLang(lang) {
    this.setState({switchLangVisible: false})
    if (lang !== this.props.lang) this.props.api.lang.switch(lang)
  }

  render() {
    const seriesData = this.state.seriesData

    if (!seriesData && !this.state.err) {
      return <Loading />
    }

    if (this.state.err) {
      return <Error err={this.state.err}/>
    }

    if (seriesData) {
      return (
        <div className="episode-chooser">
          {!!seriesData.length &&
            <div className="series-list">
              {seriesData.map((series, key) => {
                return <Series
                  key={key}
                  title={series.title}
                  summary={series.summary}
                  episodes={series.episodes}
                  series={key}
                  selectedEpisode={this.state.selectedEpisode.series === key ? this.state.selectedEpisode.episode : false }
                  select={::this.select}
                  deselect={::this.deselect}
                  play={::this.play}
                />
              })}
            </div>
          }
          {!seriesData.length &&
            <div className="font3 empty">{this.props.api.translate('episode-chooser', 'No episodes available in selected language')}</div>
          }
          <div className="other-languages btn font2" onClick={::this.showSwitchLang}>{this.props.api.translate('episode-chooser', 'other languages')}</div>
          {this.state.switchLangVisible &&
            <LangSwitcherModal
              api={this.props.api}
              lang={this.props.lang}
              newLang={::this.newLang}
            />
          }
        </div>
      )
    }
  }
}

export default EpisodeChooser
