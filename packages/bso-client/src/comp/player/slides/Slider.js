import React from 'react'

class Slider extends React.Component {
  constructor(props) {
    super(props)

    let complete = props.complete === 'always'

    this.state = {
      complete: complete,
      score: 50,
      gripPos: null
    }
  }


  render() {
    return (
      <div className="slide slider">
        <div className="question" dangerouslySetInnerHTML={{__html: this.props.question}}></div>

        <div className="answer-container">
          <div className="track-container">
            <div className="track"></div>
            <div
              className="grip"
              style={{left: this.state.gripPos + 'px'}}
            ></div>
          </div>
          <div className="answers">
            {this.props.answers.map((answer, key) => {
              return (
               <div key={key}>{answer.value}</div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Slider
