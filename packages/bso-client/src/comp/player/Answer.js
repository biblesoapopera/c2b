import React from 'react'
import Feedback from './Feedback'

class Answer extends React.Component {
  click(){
    return this.props.click(this.props.value, this.props.score)
  }

  render() {
    return (
      <div className="answer">
        <div
          className={'btn' + (this.props.active ? ' active' : '')}
          onClick={::this.click}
        >
          <div className="tick"></div>
          <div className="text">{this.props.value}</div>
        </div>
        <Feedback
          text={this.props.feedback}
          showReset={this.props.showFeedbackReset}
          showNext={this.props.showFeedbackNext}
          reset={this.props.reset}
          next={this.props.next}
        />
      </div>
    )
  }
}

export default Answer
