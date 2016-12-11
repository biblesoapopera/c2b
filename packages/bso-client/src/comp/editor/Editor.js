import React from 'react'

class Editor extends React.Component {
  editAudio() {
    this.props.go(['audio-editor'])
  }

  editSeries() {
    this.props.go(['series-editor'])
  }

  editEpisode() {
    this.props.go(['episode-editor'])
  }

  tr(str) {
    return this.props.tr('editor', str)
  }

  render() {
    return (
      <div className="editor">
        <div className="text font1">{this.tr('What would you like to edit?')}</div>
        <div className="btn font2" onClick={::this.editAudio}>{this.tr('Audio Library')}</div>
        <div className="btn font2" onClick={::this.editSeries}>{this.tr('Series')}</div>
        <div className="btn font2" onClick={::this.editEpisode}>{this.tr('Episode')}</div>
      </div>
    )
  }
}

export default Editor
