import React from 'react'
import Answer from '../Answer'

class Pick extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      complete: props.complete === 'always',
      score: 0,
      value: '',
      activeKey: false
    }
  }

  click(key, value, score){
    this.setState({
      score: score,
      value: value,
      activeKey: key
    })
  }

  reset(){
    console.log('reset')
  }

  render() {
    return (
      <div className="slide pick">
        <div className="pick-outter">
          <div className="question" dangerouslySetInnerHTML={{__html: this.props.question}}></div>

          <div className="answers">
            {this.props.answers.map((answer, key) => {
              return <Answer
                key={key}
                active={this.state.activeKey === key}
                value={answer.value}
                score={answer.score}
                click={this.click.bind(this, key)}
                feedback={["This is test feedback", "part 2"]}
                showFeedbackReset={true}
                showFeedbackNext={true}
                next={this.props.next}
                reset={::this.reset}
              />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Pick
