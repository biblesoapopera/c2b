import React from 'react'
import Episode from './Episode'
import Swipe from './Swipe'

class Series extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollPos: 0,
      selectedEpisode: props.selectedEpisode
    }
  }

  scrollLeft() {
    if (this.state.scrollPos === -(this.props.episodes.length - 2) * 40) return
    this.setState({scrollPos: this.state.scrollPos - 80})
  }

  scrollRight() {
    if (this.state.scrollPos === 0) return
    this.setState({scrollPos: this.state.scrollPos + 80})
  }

  select(episodeNum) {
    this.props.select(this.props.series, episodeNum)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEpisode !== false) this.setState({selectedEpisode: nextProps.selectedEpisode})
  }

  render() {
    return (
      <div className="series">
        <div className="info">
          <div className="font2">{this.props.title}</div>
          <div className="font3">{this.props.summary}</div>
        </div>

        <div className="series-scroll">
          <div className="scroll-right" onClick={::this.scrollRight}><img src="img/left.png"/></div>
          <Swipe
            className="episode-swipe"
            onSwipeLeft={::this.scrollLeft}
            onSwipeRight={::this.scrollRight}
          >

            <div
              className="episode-list"
              style={{left: this.state.scrollPos + 'vw'}}
            >
              {this.props.episodes.map((episode, key) => {
                return <Episode
                  key={key}
                  title={episode.title}
                  summary={episode.summary}
                  img={episode.img}
                  series={this.props.series}
                  episodeNum={key}
                  select={::this.select}
                  selected={this.props.selectedEpisode === key}
                />
              })}
            </div>
          </Swipe>
          <div className="scroll-left" onClick={::this.scrollLeft}><img src="img/right.png"/></div>
        </div>

        <div className={'episode-detail' + (this.props.selectedEpisode !== false ? ' open' : '')}>
          {this.state.selectedEpisode !== false &&
            <div>
              <div
                className="detail-img"
                style={{backgroundImage: "url('" + this.props.episodes[this.state.selectedEpisode].img + "')"}}
              >
                <div className="overlay">
                  <div className="top">
                    <div className="title font2">{this.props.episodes[this.state.selectedEpisode].title}</div>
                    <div className="close font2"><div onClick={this.props.deselect}>✖</div></div>
                  </div>
                  <div className="play" onClick={this.props.play}><div><span>▶</span></div></div>
                  <div></div>
                </div>
              </div>
              <div className="detail-summary">
                <div className="font3">{this.props.episodes[this.state.selectedEpisode].summary}</div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Series
