import React from 'react'

class Slider extends React.Component {
  constructor(props) {
    super(props)

    let complete = props.complete === 'always'

    this.state = {
      complete: complete,
      score: 50
    }

    this.gripState = {
      handlers: {},
      gripScore: 50,
      start: 0
    }
  }

  componentDidMount() {
    this.positionGrip(this.state.score)
  }

  positionGrip(value) {
    this.grip.style.left = ((this.track.clientWidth * value/100) - this.grip.clientWidth / 2) + 'px'
    this.grip.style.top = (- (this.grip.clientHeight / 2  - this.track.clientHeight / 2)) + 'px'
  }

  trackClick(evt) {
    const newScore = Math.round((evt.clientX - this.track.getBoundingClientRect().left) * 100 / this.track.clientWidth)
    this.setState({
      score: newScore
    })
    this.positionGrip(newScore)
  }

  dragstart(evt) {
    this.gripState.handlers = {
      mouseup: ::this.dragend,
      touchend: ::this.dragend,
      mousemove: ::this.dragmove,
      touchmove: ::this.dragmove
    }
    this.slide.addEventListener('mouseup', this.gripState.handlers.mouseup)
    this.slide.addEventListener('touchend', this.gripState.handlers.touchend)
    this.slide.addEventListener('mousemove', this.gripState.handlers.mousemove)
    this.slide.addEventListener('touchmove', this.gripState.handlers.touchmove)

    this.gripState.start = evt.touches ? evt.touches[0].clientX : evt.clientX

    this.grip.classList.add('active')
  }

  dragmove(evt) {
    evt.stopPropagation()
    const delta = (evt.touches ? evt.touches[0].clientX : evt.clientX) - this.gripState.start
    let tempScore = Math.round(this.state.score + (delta * 100 / this.track.clientWidth))

    if (tempScore > 100) tempScore = 100
    else if (tempScore < 0) tempScore = 0

    this.gripState.gripScore = tempScore
    this.positionGrip(tempScore)
  }

  dragend(evt) {
    evt.stopPropagation()
    this.slide.removeEventListener('mouseup', this.gripState.handlers.mouseup)
    this.slide.removeEventListener('touchend', this.gripState.handlers.touchend)
    this.slide.removeEventListener('mousemove', this.gripState.handlers.mousemove)
    this.slide.removeEventListener('touchmove', this.gripState.handlers.touchmove)

    this.grip.classList.remove('active')
    this.setState({
      score: this.gripState.gripScore
    })
  }

  render() {
    return (
      <div className="slide slider"
        ref={slide => this.slide = slide}
      >
        <div className="question" dangerouslySetInnerHTML={{__html: this.props.question}}></div>

        <div className="answer-container">
          <div className="track-container">
            <div className="track"
              onClick={::this.trackClick}
              ref={track => this.track = track}
            ></div>
            <div
              className="grip"
              ref={grip => this.grip = grip}
              onMouseDown={::this.dragstart}
              onTouchStart={::this.dragstart}
            ></div>
          </div>
          <div className="answers">
            {this.props.answers.map((answer, key) => {
              return (
               <div key={key}>{answer.value}</div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Slider
