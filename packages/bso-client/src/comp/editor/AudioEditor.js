import React from 'react'

class AudioEditor extends React.Component {
  tr(str) {
    return this.props.tr('audio-editor', str)
  }

  render() {
    return (
      <div className="audio-editor">
Audio Editor
      </div>
    )
  }
}

export default AudioEditor
