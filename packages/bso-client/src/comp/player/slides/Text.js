import React from 'react'

class Text extends React.Component {
  render() {
    return (
      <div className="slide text" dangerouslySetInnerHTML={{__html: this.props.text}}>
      </div>
    )
  }
}

export default Text
