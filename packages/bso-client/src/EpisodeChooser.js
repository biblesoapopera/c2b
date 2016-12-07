import React from 'react'
import getTranslateFn from './i18n/getTranslateFn'
import Series from './Series'

class EpisodeChooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEpisode: {series: 0, episode: 1}
    }
  }

  select(seriesNum, episodeNum) {
    this.setState({selectedEpisode: {series: seriesNum, episode:episodeNum}})
  }

  deselect() {
    this.setState({selectedEpisode: false})
  }

  play() {
    this.props.go([
      'choose-delivery',
      this.state.selectedEpisode.series,
      this.state.selectedEpisode.episodeNum
    ])
  }

  render() {
    let tr = getTranslateFn(this.props.locale, 'episode-chooser')

    let seriesList
    Object.keys(this.props.series).some(key => {
      if(key === this.props.locale) {
        seriesList = this.props.series[key]
        return true
      }
    })

    return (
      <div className="episode-chooser">
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
        <div className="other-languages btn font2">{tr('other languages')}</div>
      </div>
    )
  }
}

export default EpisodeChooser
