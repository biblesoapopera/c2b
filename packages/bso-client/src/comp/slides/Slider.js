import React from 'react'

class Slider extends React.Component {
  render() {
    return (
      <div className="slide slider">
        <div className="question" dangerouslySetInnerHTML={{__html: this.props.question}}></div>
      </div>
    )
  }
}

export default Slider
