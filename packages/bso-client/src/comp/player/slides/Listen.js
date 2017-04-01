import blankSquare from '../../blankSquare'
import React from 'react'
import audioPlayer from '../audioPlayer'

class Listen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      percComplete: 0,
      progressWidth: 0,
      progressAnimate: true,
      gripPercComplete: 0,
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
    this.positionGrip(this.state.gripPercComplete)
    window.addEventListener("resize", this.handlers.resize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handlers.resize, false)
    window.removeEventListener('mouseup', this.handlers.dragend, false)
    window.removeEventListener('touchend', this.handlers.dragend, false)
    window.removeEventListener('mousemove', this.handlers.dragmove, false)
    window.removeEventListener('touchmove', this.handlers.dragmove, false)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused === this.props.focused) return

    if (!nextProps.focused && this.state.playing) {
      this.audioPlayer.pause()
      this.setState({playing: false})
    }
  }

  resize(){
    this.positionGrip(this.state.gripPercComplete)
  }

  positionGrip(value) {
    this.setState({
      gripPercComplete: value,
      gripLeft: (this.track.clientWidth * value/100) - this.grip.clientWidth / 2,
      gripTop: this.grip.style.top = (- (this.grip.clientHeight / 2  - this.track.clientHeight / 2)),
      progressWidth: value
    })
  }

  trackClick(evt) {
    const newPercComplete = Math.round((evt.clientX - this.track.getBoundingClientRect().left) * 100 / this.track.clientWidth)

    if (this.audioPlayer) {
      this.audioPlayer.jump(this.props.audioStart + (this.props.audioEnd - this.props.audioStart) * newPercComplete / 100)
    }

    this.setState({
      percComplete: newPercComplete,
      gripAnimate: true
    })
    this.positionGrip(newPercComplete)
  }

  dragstart(evt) {
    if (evt.type === 'mousedown') evt.preventDefault()

    this.props.disableNav()

    window.addEventListener('mouseup', this.handlers.dragend, false)
    window.addEventListener('touchend', this.handlers.dragend, false)
    window.addEventListener('mousemove', this.handlers.dragmove, false)
    window.addEventListener('touchmove', this.handlers.dragmove, false)

    if (this.state.playing) this.audioPlayer.pause()

    this.setState({
      gripStart: evt.touches ? evt.touches[0].clientX : evt.clientX,
      gripDragging: true,
      progressAnimate: false
    })
  }

  dragmove(evt) {
    evt.stopPropagation()
    const delta = (evt.touches ? evt.touches[0].clientX : evt.clientX) - this.state.gripStart
    let tempPercComplete = Math.round(this.state.percComplete + (delta * 100 / this.track.clientWidth))

    if (tempPercComplete > 100) tempPercComplete = 100
    else if (tempPercComplete < 0) tempPercComplete = 0

    this.positionGrip(tempPercComplete)
  }

  dragend(evt) {
    evt.stopPropagation()
    window.removeEventListener('mouseup', this.handlers.dragend, false)
    window.removeEventListener('touchend', this.handlers.dragend, false)
    window.removeEventListener('mousemove', this.handlers.dragmove, false)
    window.removeEventListener('touchmove', this.handlers.dragmove, false)

    this.props.enableNav()

    if (this.audioPlayer) {
      this.audioPlayer.jump(this.props.audioStart + (this.props.audioEnd - this.props.audioStart) * this.state.gripPercComplete / 100)
    }

    if (this.state.playing) this.audioPlayer.play()

    this.setState({
      percComplete: this.state.gripPercComplete,
      gripDragging: false,
      progressAnimate: true
    })
  }

  animateEnd(){
    this.setState({gripAnimate: false})
  }

  togglePlay() {
    if (!this.audioPlayer && this.state.percComplete !== 100) {
      this.audioPlayer = audioPlayer(
        this.props.audioFile,
        this.props.audioStart + (this.props.audioEnd - this.props.audioStart) * this.state.percComplete / 100,
        this.props.audioEnd,
        ::this.progress
      )
      this.audioPlayer.done.then(() => {
        this.audioPlayer = undefined
        this.setState({
          percComplete: 100,
          gripAnimate: true,
          playing: false
        })
        this.positionGrip(100)
      })
    }

    if (this.state.playing) {
      this.audioPlayer.pause()
      this.setState({playing: false})
    } else if (this.state.percComplete === 100) {
      this.setState({percComplete: 0})
      this.positionGrip(0)
    } else {
      this.audioPlayer.play()
      this.setState({playing: true})
    }
  }

  progress(currentTime){
    let newPercComplete = 100 * (currentTime - this.props.audioStart) / (this.props.audioEnd - this.props.audioStart)
    this.setState({
      percComplete: newPercComplete,
      gripAnimate: true
    })
    this.positionGrip(newPercComplete)
  }

  render() {
    let playerBtn
    if (this.state.playing) playerBtn = 'pause'
    else if (this.state.percComplete === 100) playerBtn = 'rewind'
    else playerBtn = 'play'

    return (
      <div className="slide listen">
        <div className="listen-text">
          <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
        </div>

        <div className="track-container">
          <div className={'progress ' + (this.state.progressAnimate ? 'animate' : '')}
            style = {{
              width: this.state.progressWidth + '%'
            }}
          ></div>
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

        <div
          className="control"
          onClick={::this.togglePlay}
        >
          <img
            className={'player-btn ' + playerBtn}
            src={blankSquare}
          />
        </div>
      </div>
    )
  }
}

export default Listen

