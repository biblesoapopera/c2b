import React from 'react'
import Series from './Series'
import LangSwitcherModal from '../modal/LangSwitcherModal'

class EpisodeChooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEpisode: false,
      showLang: false
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
    this.props.go([
      'choose-delivery',
      this.props.store.series.find(this.props.lang)[this.state.selectedEpisode.series].episodes[this.state.selectedEpisode.episode].id
    ])
  }

  tr(str) {
    return this.props.tr('episode-chooser', str)
  }

  showLang() {
    this.setState({showLang: true})
  }

  newLang(lang) {
    this.setState({showLang: false})
    if (lang !== this.props.lang) this.props.switchLang(lang)
  }

  render() {
    let seriesList = this.props.store.series.find(this.props.lang)
    return (
      <div className="episode-chooser">
        {!!seriesList.length &&
          <div className="series-list">
            {seriesList.map((series, key) => {
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
        {!seriesList.length &&
          <div className="font3 empty">{this.tr('No episodes available in selected language')}</div>
        }
        <div className="other-languages btn font2" onClick={::this.showLang}>{this.tr('other languages')}</div>
        {this.state.showLang &&
          <LangSwitcherDropdown
            store={this.props.store}
            lang={this.props.lang}
            newLang={::this.newLang}
          />
        }
      </div>
    )
  }
}

export default EpisodeChooser
