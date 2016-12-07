import React from 'react'
import getTranslateFn from './i18n/getTranslateFn'

class DeliveryChooser extends React.Component {
  render() {
    let tr = getTranslateFn(this.props.locale, 'episode-chooser')

    return (
      <div className="delivery-chooser">
        <div className="font2">How would you like to listen to this episode?</div>

        <div>{this.props.locale}:S{this.props.series}:E{this.props.episode}</div>

        <div className="btn">
          <div className="font2">Play episode now</div>
          <div className="font3">using streaming data</div>
        </div>

        <div className="btn">
          <div className="font2">Play episode now</div>
          <div className="font3">using audio file on this device</div>
        </div>

        <div className="btn">
          <div className="font2">Download episode audio</div>
          <div className="font3">to listen to offline and share with friends</div>
        </div>

      </div>
    )
  }
}

export default DeliveryChooser
