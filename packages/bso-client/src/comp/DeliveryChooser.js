import React from 'react'

class DeliveryChooser extends React.Component {
  play() {
    this.props.go(['player', this.props.episode])
  }

  render() {
    return (
      <div className="delivery-chooser">
        <div className="font2">How would you like to listen to this episode?</div>

        <div>{this.props.lang}:S{this.props.series}:E{this.props.episode}</div>

        <div className="btn" onClick={::this.play}>
          <div className="font2">Play episode now</div>
          <div className="font3">using streaming audio</div>
        </div>

        <div className="btn">
          <div className="font2">Play episode now</div>
          <div className="font3">using an audio file on this device</div>
        </div>

        <div className="btn">
          <div className="font2">Download episode audio</div>
          <div className="font3">to listen offline and share with friends</div>
        </div>

      </div>
    )
  }
}

export default DeliveryChooser
