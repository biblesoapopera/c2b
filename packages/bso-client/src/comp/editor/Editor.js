import React from 'react'
import CreateSeries from './CreateSeries'
import Loading from '../Loading'
import Error from '../Error'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seriesData: false,
      lang: this.props.lang,
      err: false
    }
  }

  componentWillMount() {
    this.props.api.menu(['hamburger'])
  }

  async componentDidMount() {
    let res = await this.props.api.series.readLangAll(this.props.lang)
    if (res.status === 200) {
      this.setState({seriesData: res.body})
      let create = (
        <CreateSeries
          key="create-series"
          api={this.props.api}
          lang={this.state.lang}
          order={this.state.seriesData && this.state.seriesData.length}
          createdSeries = {::this.createdSeries}
        />
      )
      this.props.api.menu([create, 'hamburger'])
    } else {
      this.setState({err: res})
    }
  }

  createdSeries(series) {
    let newSeriesData = this.state.seriesData.map(item=>item)
    newSeriesData.push(series)
    this.setState({seriesData: newSeriesData})
  }

  render() {
    const seriesData = this.state.seriesData

    if (!seriesData && !this.state.err) {
      return <Loading />
    }

    if (this.state.err) {
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
              {this.props.api.lang.getName(this.state.lang)}
            </span>
          </div>

          <div>

              {this.state.seriesData.map(item => {
                return (
                  <div
                    key={item.order}
                  >
                    <div>{item.title}</div>
                    <div>{item.summary}</div>

                    <div className="move-up" onClick={() => this.moveUp(item)}>
                      <div className="inner">
                        <div className="icon"><div></div></div>
                      </div>
                    </div>

                    <div className="move-down" onClick={() => this.moveDown(item)}>
                      <div className="inner">
                        <div className="icon"><div></div></div>
                      </div>
                    </div>

                    <div className="edit" onClick={() => this.edit(item)}>
                      <div className="inner">
                        <div className="icon"><div></div></div>
                      </div>
                    </div>

                    <div className="publish unpublished" onClick={() => this.publish(item)}>
                      <div className="inner">
                        <div className="icon"><div></div></div>
                      </div>
                    </div>

                    <div className="grow" onClick={() => this.grow(item)}>
                      <div className="inner">
                        <div className="icon"><div></div></div>
                      </div>
                    </div>
                  </div>
                )
              })}

          </div>
        </div>
      )
    }
  }
}

export default Editor
