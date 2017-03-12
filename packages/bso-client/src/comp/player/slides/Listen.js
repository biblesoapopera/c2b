import blankSquare from '../../blankSquare'
import React from 'react'

class Listen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pauseTime: 0
    }

    this.gripState = {
      handlers: {},
      gripTime: 0,
      start: 0
    }
  }

  componentDidMount() {
    this.positionGrip(this.state.pauseTime)
  }

  componenetDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) this.positionGrip(this.state.pauseTime)
  }

  positionGrip(value) {
console.log(this.grip.clientWidth, value)
    this.grip.style.left = ((this.track.clientWidth * value/100) - this.grip.clientWidth / 2) + 'px'
    this.grip.style.top = (- (this.grip.clientHeight / 2  - this.track.clientHeight / 2)) + 'px'
  }

  trackClick(evt) {/*
    const newScore = Math.round((evt.clientX - this.track.getBoundingClientRect().left) * 100 / this.track.clientWidth)
    this.setState({
      score: newScore
    })
    this.positionGrip(newScore)*/
  }

  dragstart(evt) {/*
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

    this.grip.classList.add('active')*/
  }

  render() {
    return (
      <div className="slide listen">
        <div className="listen-text">
          <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
        </div>
        <div className="track-container">
          <div className="track"
            onClick={::this.trackClick}
            ref={track => this.track = track}
          ></div>
          <img
            className="grip"
            ref={grip => this.grip = grip}
            onMouseDown={::this.dragstart}
            onTouchStart={::this.dragstart}
            src={blankSquare}
          />
        </div>
        <div className="control">
          <img
            className="player-btn play"
            src={blankSquare}
          />
        </div>
      </div>
    )
  }
}

export default Listen
/*

>*/
