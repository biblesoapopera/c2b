import React from 'react'
import Text from './slides/Text'
import Slider from './slides/Slider'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slide: 0
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
    console.log('Play audio')
  }

  render() {
    let type
    let slide

    return (
      <div className="player">
        {this.episode.slides.map((slideObj, key) => {
          if (slideObj.text) type = 'text'
          else if (slideObj.slider) type = 'slider'
          else if (slideObj.listen) type = 'listen'
          else if (slideObj.pick) type = 'pick'
          else if (slideObj.multipick) type = 'multipick'

          slide = slideObj[type]

          if (type === 'text') {
            return (<Text
              key={key}
              text={slide.text}
              audio={slide.audio}
            />
            )
          } else if (type === 'slider') {
            return (<Slider
              key={key}
              question={slide.question}
              answers={slide.answers}
              feedback={slide.feedback}
            />
            )
          }
        })}

        <div className="nav">
          <div className={'previous btn ' + (this.state.slide !== 0 ? '' : 'hide')} onClick={::this.previous}>
            <div><div></div></div>
          </div>
            <div className={'audio btn ' + (type === 'text' && slide.audio ? '' : 'hide')} onClick={::this.audio}>
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
