import React from 'react'

class Text extends React.Component {
  render() {
    return (
      <div
        className={'slide text' + (this.props.active ? ' active' : '') + (this.props.dir ? (' ' + this.props.dir) : '')}
        dangerouslySetInnerHTML={{__html: this.props.text}}
      >
      </div>
    )
  }
}

export default Text
