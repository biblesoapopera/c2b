import React from 'react'
import Text from './slides/Text'
import Slider from './slides/Slider'
import Pick from './slides/Pick'
import Swipe from '../Swipe'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slide: 2
    }

    this.episode = this.props.store.episode.find(this.props.episode)
  }

  next() {
    if (this.state.slide !== this.episode.slides.length-1) {
      this.setState({slide: this.state.slide + 1})
    }
  }

  previous() {
    if (this.state.slide !== 0) {
      this.setState({slide: this.state.slide - 1})
    }
  }

  audio() {
    console.log('Play audio')
  }

  render() {
    let activeSlide

    return (
      <div className="player">

        <Swipe
          className="slide-swipe"
          onSwipeLeft={::this.next}
          onSwipeRight={::this.previous}
        >
          <div
            className="slide-list"
            style={{left: (-100 * this.state.slide) + '%'}}
          >
            {this.episode.slides.map((slideObj, key) => {
              let type
              let slide
              let slideJsx

              if (slideObj.text) type = 'text'
              else if (slideObj.slider) type = 'slider'
              else if (slideObj.listen) type = 'listen'
              else if (slideObj.pick) type = 'pick'
              else if (slideObj.multipick) type = 'multipick'

              slide = slideObj[type]

              if (key === this.state.slide) activeSlide = slide

              if (type === 'text') {
                slideJsx = (<Text
                  text={slide.text}
                />
                )
              } else if (type === 'slider') {
                slideJsx = (<Slider
                  question={slide.question}
                  answers={slide.answers}
                  feedback={slide.feedback}
                  complete={slide.complete}
                />
                )
              } else if (type === 'pick') {
                slideJsx = (<Pick
                  question={slide.question}
                  answers={slide.answers}
                  feedback={slide.feedback}
                  complete={slide.complete}
                />
                )
              }

              return (
                <div className="slide-container" key={key}>{slideJsx}</div>
              )
            })}
          </div>
        </Swipe>


        <div className="nav">
          <div className={'previous btn ' + (this.state.slide !== 0 ? '' : 'hide')} onClick={::this.previous}>
            <div><div></div></div>
          </div>
            <div className={'audio btn ' + (activeSlide.audio ? '' : 'hide')} onClick={::this.audio}>
            <div><div></div></div>
          </div>
          <div className={'next btn ' + (this.state.slide !== this.episode.slides.length-1 ? '' : 'hide')} onClick={::this.next}>
            <div><div></div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Player
