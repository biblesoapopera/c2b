import React from 'react'

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src="img/spinner.svg" />
        {this.props.percentage !== void 0 && <div>{this.props.percentage}%</div>}
      </div>
    )
  }
}

export default Loading
