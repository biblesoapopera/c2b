import React from 'react'

class Text extends React.Component {
  render() {
    return (
      <div className="slide text">
        <div dangerouslySetInnerHTML={{__html: this.props.text}}></div>
      </div>
    )
  }
}

export default Text
