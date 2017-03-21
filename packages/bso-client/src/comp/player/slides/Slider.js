import React from 'react'
import blankSquare from '../../blankSquare'

class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      complete: props.complete === 'always',
      score: 50,
      gripScore: 50,
      gripLeft: 0,
      gripTop: 0,
      gripStart: 0,
      gripDragging: false,
      gripAnimate: false
    }

    this.handlers = {
      dragend: ::this.dragend,
      dragmove: ::this.dragmove,
      resize: ::this.resize
    }
  }

  componentDidMount() {
    this.positionGrip(this.state.gripScore)
    window.addEventListener("resize", this.handlers.resize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handlers.resize, false)
    window.removeEventListener('mouseup', this.handlers.dragend, false)
    window.removeEventListener('touchend', this.handlers.dragend, false)
    window.removeEventListener('mousemove', this.handlers.dragmove, false)
    window.removeEventListener('touchmove', this.handlers.dragmove, false)
  }

  resize(){
    this.positionGrip(this.state.gripScore)
  }

  positionGrip(value) {
    this.setState({
      gripScore: value,
      gripLeft: (this.track.clientWidth * value/100) - this.grip.clientWidth / 2,
      gripTop: this.grip.style.top = (- (this.grip.clientHeight / 2  - this.track.clientHeight / 2)),
    })
  }

  trackClick(evt) {
    const newScore = Math.round((evt.clientX - this.track.getBoundingClientRect().left) * 100 / this.track.clientWidth)
    this.setState({
      score: newScore,
      gripAnimate: true
    })
    this.positionGrip(newScore)
  }

  dragstart(evt) {
    if (evt.type === 'mousedown') evt.preventDefault()

    this.props.disableNav()

    window.addEventListener('mouseup', this.handlers.dragend, false)
    window.addEventListener('touchend', this.handlers.dragend, false)
    window.addEventListener('mousemove', this.handlers.dragmove, false)
    window.addEventListener('touchmove', this.handlers.dragmove, false)

    this.setState({
      gripStart: evt.touches ? evt.touches[0].clientX : evt.clientX,
      gripDragging: true
    })
  }

  dragmove(evt) {
    evt.stopPropagation()
    const delta = (evt.touches ? evt.touches[0].clientX : evt.clientX) - this.state.gripStart
    let tempScore = Math.round(this.state.score + (delta * 100 / this.track.clientWidth))

    if (tempScore > 100) tempScore = 100
    else if (tempScore < 0) tempScore = 0

    this.positionGrip(tempScore)
  }

  dragend(evt) {
    evt.stopPropagation()
    window.removeEventListener('mouseup', this.handlers.dragend, false)
    window.removeEventListener('touchend', this.handlers.dragend, false)
    window.removeEventListener('mousemove', this.handlers.dragmove, false)
    window.removeEventListener('touchmove', this.handlers.dragmove, false)

    this.props.enableNav()

    this.setState({
      score: this.state.gripScore,
      gripDragging: false
    })
  }

  animateEnd(){
    this.setState({gripAnimate: false})
  }

  render() {
    return (
      <div className="slide slider"
        ref={slide => this.slide = slide}
      >
        <div className="question">
          <div dangerouslySetInnerHTML={{__html: this.props.question}}></div>
        </div>

        <div className="track-container">
          <div className="track"
            onClick={::this.trackClick}
            ref={track => this.track = track}
          ></div>
          <img
            className={'grip ' + (this.state.gripAnimate ? 'animate ' : '') + (this.state.gripDragging ? 'active' : '')}
            ref={grip => this.grip = grip}
            onMouseDown={::this.dragstart}
            onTouchStart={::this.dragstart}
            onTransitionEnd={::this.animateEnd}
            src={blankSquare}
            style = {{
              left: this.state.gripLeft + 'px',
              top: this.state.gripTop + 'px'
            }}
          />
        </div>


        <div className="answers">
          {this.props.answers.map((answer, key) => {
            return (
              <div key={key}>{answer.value}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Slider
