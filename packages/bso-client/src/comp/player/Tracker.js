import React from 'react'

class Tracker extends React.Component {
  render() {
    return (
      <div className="slide-tracker">
        {this.props.current}/{this.props.total}
      </div>
    )
  }
}

export default Tracker
