import React from 'react'
import CreateSeriesModal from './CreateSeriesModal'
import Loading from '../Loading'
import Error from '../Error'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      create: false,
      seriesData: false,
      err: false
    }
  }

  async componentDidMount() {
    let res = await this.props.api.series.readLangAll(this.props.lang)
    if (res.status === 200) {
      this.setState({seriesData: res.body})
    } else {
      this.setState({err: res})
    }
  }

  create() {
    this.setState({create: true})
  }

  created() {
    this.setState({create: false})
  }

  render() {
    const seriesData = this.state.seriesData

    if (!seriesData && !this.state.err) {
      return <Loading />
    }

    if (this.state.err) {
console.log(this.state.err)
      return <Error err={this.state.err}/>
    }

    if (seriesData) {
      return (
        <div className="editor">
          <div className="font1">
            <span>
              {this.props.api.translate('editor', 'edit series in') + ' '}
            </span>
            <span>
              {this.props.api.lang.getName(this.props.lang)}
            </span>
          </div>

          <div onClick={::this.create} className="create"></div>

          {this.state.create &&
            <CreateSeriesModal
              api={this.props.api}
              lang={this.props.lang}
              created={::this.created}
              order={seriesData.length}
            />
          }


        </div>
      )
    }
  }
}

export default Editor
