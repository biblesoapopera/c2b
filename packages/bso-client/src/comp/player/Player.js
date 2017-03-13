import React from 'react'
import Text from './slides/Text'
import Slider from './slides/Slider'
import Pick from './slides/Pick'
import Listen from './slides/Listen'
import Swipe from '../Swipe'
import Tracker from './Tracker'
import Loading from '../Loading'
import Error from '../Error'
import audioPlayer from './audioPlayer'
import blankSquare from '../blankSquare'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slide: 2,
      err: false,
      episodeData: false,
      loadingAudio: false
    }

    this.audioFiles = {}
  }

  componentWillMount() {
    this.props.api.menu(['hamburger'])
  }

  async componentDidMount() {
    let res = await this.props.api.episode.readId(this.props.episode)
    if (res.status === 200) {
      this.setState({episodeData: res.body})
      this.loadAudio(res.body)
      this.updateMenu(this.state.slide + 1, res.body.slides.length)
    } else {
      this.setState({err: res})
    }
  }

  updateMenu(current, total){
    let tracker = (
      <Tracker
      key="slide-tracker"
      current = {current}
      total = {total}
      />
    )
    this.props.api.menu([tracker, 'hamburger'])
  }

  loadAudio(episodeData){
    // load audio files in order of need
    let audioFiles = episodeData.slides.reduce((previous, slideObj, key) => {
      let slide = this.slideObjToSlide(slideObj)[0]
      if (slide.audio && previous.indexOf(slide.audio.file) === -1) previous.push(slide.audio.file)
      return previous
    }, [])

    audioFiles
      .filter(file => {
        if (this.props.api.audio.has(file)) {
          this.audioFiles[file] = {ready: true}
          return false
        } else {
          let outerResolve
          let outerReject
          let readyPromise = new Promise((resolve, reject)=>{
            outerResolve = resolve
            outerReject = reject
          })
          this.audioFiles[file] = {
            ready: false,
            readyPromise: readyPromise,
            resolve: outerResolve,
            reject: outerReject,
            progress: 0
          }
          return true
        }
      })
      .reduce((p, file) => {
        return p.then(async () => {
          await this.props.api.audio.loadRemote(file, (evt) => {
            if (evt.lengthComputable) {
              this.audioFiles[file].progress = Math.round(100 * evt.loaded / evt.total)
            }
          })
          this.audioFiles[file].ready = true
          this.audioFiles[file].resolve()
        });
      }, Promise.resolve());
  }

  slideObjToSlide(slideObj) {
    let slide
    let type

    if (slideObj.text) type = 'text'
    else if (slideObj.slider) type = 'slider'
    else if (slideObj.listen) type = 'listen'
    else if (slideObj.pick) type = 'pick'
    else if (slideObj.multipick) type = 'multipick'

    slide = slideObj[type]

    return [slide, type]
  }

  next() {
    if (this.state.slide !== this.state.episodeData.slides.length-1) {
      if (this.audioPlayer) {
        this.audioPlayer.kill()
        this.audioPlayer = undefined
      }
      this.updateMenu(this.state.slide + 2, this.state.episodeData.slides.length)
      this.setState({slide: this.state.slide + 1})
    }
  }

  previous() {
    if (this.state.slide !== 0) {
      if (this.audioPlayer) {
        this.audioPlayer.kill()
        this.audioPlayer = undefined
      }
      this.updateMenu(this.state.slide, this.state.episodeData.slides.length)
      this.setState({slide: this.state.slide - 1})
    }
  }

  async audio() {
    let slide = this.slideObjToSlide(this.state.episodeData.slides[this.state.slide])[0]
    let file = slide.audio.file

    if (!this.audioFiles[file].ready) {
      this.setState({loadingAudio: true})
      await this.audioFiles[file].readyPromise
      this.setState({loadingAudio: false})
    }

    this.audioPlayer = audioPlayer(this.props.api.audio.get(file), slide.audio.start, slide.audio.end)
    this.audioPlayer.play()
  }

  render() {
    let activeSlide
    let activeType

    const episodeData = this.state.episodeData

    let loading = null
    if ((!episodeData || this.state.loadingAudio) && !this.state.err) {
      loading = <Loading/>
    }

    let err = null
    if (this.state.err) {
      err = <Error err={this.state.err}/>
    }

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
            {episodeData && episodeData.slides.map((slideObj, key) => {
              let type
              let slide
              let slideJsx
              [slide, type] = this.slideObjToSlide(slideObj)

              if (key === this.state.slide) {
                activeSlide = slide
                activeType = type
              }

              if (type === 'text') {
                slideJsx = (
                  <Text
                    text={slide.text}
                    focused={key === this.state.slide}
                  />
                )
              } else if (type === 'slider') {
                slideJsx = (
                  <Slider
                    question={slide.question}
                    answers={slide.answers}
                    feedback={slide.feedback}
                    complete={slide.complete}
                    focused={key === this.state.slide}
                  />
                )
              } else if (type === 'pick') {
                slideJsx = (
                  <Pick
                    question={slide.question}
                    answers={slide.answers}
                    feedback={slide.feedback}
                    complete={slide.complete}
                    focused={key === this.state.slide}
                  />
                )
              } else if (type === 'listen') {
                slideJsx = (
                  <Listen
                    text={slide.text}
                    focused={key === this.state.slide}
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
          <div className={'previous ' + (this.state.slide !== 0 ? '' : 'hide')} onClick={::this.previous}>
            <img src={blankSquare}/>
          </div>
          <div className={'audio ' + ((activeType !== 'listen' && activeSlide && activeSlide.audio) ? '' : 'hide')} onClick={::this.audio}>
            <img src={blankSquare}/>
          </div>
          <div className={'next ' + ((episodeData && this.state.slide !== episodeData.slides.length-1) ? '' : 'hide')} onClick={::this.next}>
           <img src={blankSquare}/>
          </div>
        </div>

        {loading}{err}
      </div>
    )
  }
}

export default Player
