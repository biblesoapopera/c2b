import React from 'react'
import CreateSeriesModal from './CreateSeriesModal'

class CreateSeries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  show() {
    this.setState({visible: true})
  }

  hide() {
    this.setState({visible: false})
  }

  render() {
    return (
      <div className="create-series">
        <div className="inner" onClick={::this.show}>
          <div className="icon">
            <div></div>
          </div>
        </div>

        {this.state.visible &&
          <CreateSeriesModal
            api={this.props.api}
            hide={::this.hide}
            lang={this.props.lang}
            order={this.props.order}
            createdSeries={this.props.createdSeries}
          />
        }
      </div>
    )
  }
}

export default CreateSeries
