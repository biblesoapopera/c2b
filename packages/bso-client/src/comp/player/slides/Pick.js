import React from 'react'

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

  click(key, value, score, evt){
    this.setState({
      score: score,
      value: value,
      activeKey: key
    })
  }

  render() {
    return (
      <div className="slide pick">
        <div className="question" dangerouslySetInnerHTML={{__html: this.props.question}}></div>

          <div className="answers">
            {this.props.answers.map((answer, key) => {
              return (
             <div
                className={'btn' + (this.state.activeKey === key ? ' active' : '')}
                key={key}
                onClick={this.click.bind(this, key, answer.value, answer.score)}
              >
                  <div className="tick"></div>
                  <div className="text">{answer.value}</div>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
}

export default Pick
