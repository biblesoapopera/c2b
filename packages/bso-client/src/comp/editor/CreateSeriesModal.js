import React from 'react'

class CreateSeriesModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      summary: '',
      valid: false,
      loading: false,
      err: false
    }
  }

  titleChange(evt) {
    let valid = false
    if (this.state.summary && evt.target.value) valid = true
    this.setState({title: evt.target.value, valid: valid})
  }

  summaryChange(evt) {
    let valid = false
    if (this.state.title && evt.target.value) valid = true
    this.setState({summary: evt.target.value, valid: valid})
  }

  stopPropagation(evt) {
    evt.stopPropagation()
  }

  async submit(evt) {
    evt.preventDefault()

    this.setState({
      loading: true,
      err: false
    })

    let result = await this.props.api.series.create({
      lang: this.props.lang,
      order: this.props.order,
      title: this.state.title,
      summary: this.state.summary,
      published: false,
    })

    if (result && result.status === 200) {
      this.props.createdSeries(result.body)
      this.setState({loading: false})
      this.props.hide()
    } else {
      this.setState({
        valid: false,
        loading: false,
        err: true
      })
    }
  }

  render() {
    // TODO add proper validation errors to UI
    return (
      <div className="modal create-series-modal" onClick={this.props.hide}>
        <div className="modal-inner">
          <div>Create new series</div>
          <form onClick={this.stopPropagation}>
            <label>
              {this.props.api.translate('create-series', 'title')}
              <input type="text" value={this.state.title} onChange={::this.titleChange} />
            </label>
            <label>
              {this.props.api.translate('create-series', 'summary')}
              <input type="text" value={this.state.summary} onChange={::this.summaryChange} />
            </label>
            <div className="font3 error">{this.state.err && this.props.api.translate('create-series', 'error')}</div>
            <button
              disabled={(this.state.valid && !this.state.loading) ? false : 'disabled'}
              type="button"
              onClick={::this.submit}
            >
              {this.state.loading && '...'}
              {!this.state.loading && this.props.api.translate('create-series', 'ok')}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateSeriesModal
