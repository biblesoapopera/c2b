import React from 'react'

class Error extends React.Component {
  render() {
    return (
      <div className="error">
        <div>Error</div>
        <div>{this.props.err.body.msg}</div>
      </div>
    )
  }
}

export default Error
