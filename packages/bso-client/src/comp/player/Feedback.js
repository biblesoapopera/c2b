import React from 'react'
import blankSquare from '../blankSquare'

class Feedback extends React.Component {
  render() {
    return (
      <div className="feedback">
        <div className="arrow"></div>
        <div className="box">
          <div className="text">
            {this.props.text.map((text, index) => {
              return <p key={index}>{text}</p>
            })}
          </div>
          <div className="actions">
            {this.props.showReset &&
              <div className='reset' onClick={this.props.reset}>
                <img src={blankSquare}/>
              </div>
            }
            {this.props.showNext &&
              <div className='next' onClick={this.props.next}>
                <img src={blankSquare}/>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Feedback
