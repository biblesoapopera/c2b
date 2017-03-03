import React from 'react'
import Loading from './Loading'
import Error from './Error'

class DeliveryChooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      episodeData: false,
      err: false,
      readingLocal: false,
      readingRemote: false,
      hasAudio: false
    }
  }

  componentWillMount() {
    this.props.api.menu(['hamburger'])
  }

  async componentDidMount() {
    let res = await this.props.api.episode.readId(this.props.episode)
    if (res.status === 200) {
      this.setState({
        episodeData: res.body,
        hasAudio: this.props.api.audio.has(res.body.primaryAudio)
      })
    } else {
      this.setState({err: res})
    }
  }

  play() {
    this.props.api.go(['player', this.props.episode])
  }

  loadLocal() {
    this.setState({readingLocal: true})

    let input = document.createElement('input')
    input.type = 'file'

    input.addEventListener('change', async (evt) => {
      let file = evt.target.files[0]
      try {
        await this.props.api.audio.loadLocal(
          this.state.episodeData.primaryAudio,
          file
        )
        this.setState({
          readingLocal:false,
          hasAudio: true
        })
        this.play()
      } catch (err) {
        // TODO UI this error
        console.log(err)
      }
    })

    input.click()
  }

  async download() {
    this.setState({readingRemote: true})

    let fileName = this.state.episodeData.primaryAudio

    if (!this.state.hasAudio) {
      await this.props.api.audio.loadRemote(fileName, ::this.downloadProgess)
    }

    let a = document.createElement('a')
    a.download = fileName + '.mp3'
    a.href = this.props.api.audio.get(fileName)
    a.click()
    this.setState({
      readingRemote: false,
      hasAudio: true
    })
  }

  downloadProgess(evt){
    if (evt.lengthComputable) {
      this.setState({readingRemote: Math.round(100 * evt.loaded / evt.total)})
    }
  }

  render() {
    const episodeData = this.state.episodeData

    let loading = null
    if ((!episodeData || this.state.readingLocal || this.state.readingRemote) && !this.state.err) {
      loading = <Loading percentage={this.state.readingRemote}/>
    }

    let err = null
    if (this.state.err) {
      err = <Error err={this.state.err}/>
    }

    return (
      <div className="delivery-chooser">
        <div className="font2">How would you like to listen to this episode?</div>

        {episodeData &&
          <div className="font3">S{episodeData.series + 1}:E{episodeData.episode + 1} {episodeData.title}</div>
        }

        {!episodeData &&
          <div className="font3">S0:E0</div>
        }

        <div className="btn" onClick={::this.play}>
          <div className="font2">Play episode now</div>
          {!this.state.hasAudio && <div className="font3">using streaming audio</div>}
          {this.state.hasAudio && <div className="font3">using already loaded audio</div>}
        </div>

        {!this.state.hasAudio &&
          <div className="btn" onClick={::this.loadLocal}>
            <div className="font2">Play episode now</div>
            <div className="font3">using an audio file on this device</div>
          </div>
        }

        <div className="btn" onClick={::this.download}>
          {!this.state.hasAudio && <div className="font2">Download episode audio</div>}
          {this.state.hasAudio && <div className="font2">Save episode audio</div>}
          <div className="font3">to listen offline and share with friends</div>
        </div>

        {loading}{err}
      </div>
    )

  }
}

export default DeliveryChooser
