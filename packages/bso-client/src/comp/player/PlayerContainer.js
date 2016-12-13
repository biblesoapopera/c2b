import React from 'react'
import Player from './Player'

class PlayerContainer extends React.Component {
  render() {
    return (
      <div className="player-container">
        <Player
          go={this.props.go}
          episode={this.props.episode}
          tr={this.props.tr}
          store={this.props.store}
        />
      </div>
    )
  }
}

export default PlayerContainer
