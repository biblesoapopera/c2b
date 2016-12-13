import React from 'react'
import Text from './slides/Text'
import Slider from './slides/Slider'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slide: 1
    }

    this.episode = this.props.store.episode.find(this.props.episode)
  }

  next() {
    this.setState({slide: this.state.slide + 1})
  }

  previous() {
    this.setState({slide: this.state.slide - 1})
  }

  audio() {
    console.log('A')
  }

  render() {
    let slide = this.episode.slides[this.state.slide]
    let type

    if (slide.text) type = 'text'
    else if (slide.slider) type = 'slider'
    else if (slide.listen) type = 'listen'
    else if (slide.pick) type = 'pick'
    else if (slide.multipick) type = 'multipick'

    slide = slide[type]

    return (
      <div className="player">

        {type === 'text' &&
          <Text
            text={slide.text}
            audio={slide.audio}
          />
        }

        {type === 'slider' &&
          <Slider
            question={slide.question}
            answers={slide.answers}
            feedback={slide.feedback}
          />
        }

        <div className="nav">
          <div className={'previous ' + (this.state.slide !== 0 ? 'btn' : '')} onClick={::this.previous}>
            <div><div></div></div>
          </div>
            <div className={'audio ' + (type === 'text' && slide.audio ? 'btn' : '')} onClick={::this.audio}>
            <div><div></div></div>
          </div>
          <div className={'next ' + (this.state.slide !== this.episode.slides.length-1 ? 'btn' : '')} onClick={::this.next}>
            <div><div></div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Player
