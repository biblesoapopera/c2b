import React from 'react'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: title,
      summary: summary,
      valid: false
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

  submit(evt) {
    evt.preventDefault()
    console.log({
      lang: this.props.lang,
      order: this.props.order,
      title: this.state.title,
      summary: this.state.summary,
      published: false,
    })
  }

  render() {
    return (
      <div className="modal create-series-modal" onClick={() => this.props.created()}>
        <div className="modal-inner">
          <form onClick={this.stopPropagation}>
            <label>
              {this.props.api.translate('create-series', 'title')}
              <input type="text" value={this.state.title} onChange={::this.titleChange} />
            </label>
            <label>
              {this.props.api.translate('create-series', 'summary')}
              <input type="text" value={this.state.summary} onChange={::this.summaryChange} />
            </label>
            <button
              disabled={this.state.valid ? false : 'disabled'}
              type="button"
              onClick={::this.submit}
            >
              {this.props.api.translate('create-series', 'ok')}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginModal
