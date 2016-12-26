import React from 'react'
import Player from './Player'

class PlayerContainer extends React.Component {
  render() {
    return (
      <div className="player-container">
        <Player
          api={this.props.api}
          episode={this.props.episode}
        />
      </div>
    )
  }
}

export default PlayerContainer
