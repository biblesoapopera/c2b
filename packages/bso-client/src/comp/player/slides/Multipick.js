import React from 'react'

class Multipick extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      complete: props.complete === 'always',
      score: 0,
      values: [],
      activeKeys: []
    }
  }

  click(key, value, score){
    let newActiveKeys = this.state.activeKeys.slice(0)

    if (!
      this.state.activeKeys.some((k, index) => {
        if (k.index !== key) return
        newActiveKeys.splice(index, 1)
        return true
      })
    ) {
      newActiveKeys.push({index: key, value: value, score: score})
    }

    this.setState({
      score: newActiveKeys.reduce((score, k) => score + k.score, 0),
      values: newActiveKeys.map(k => k.value),
      activeKeys: newActiveKeys
    })
  }

  render() {
    return (
      <div className="slide multipick">
        <div className="multipick-outter">
          <div className="question" dangerouslySetInnerHTML={{__html: this.props.question}}></div>

          <div className="answers">
            {this.props.answers.map((answer, key) => {
              return (
             <div
                className={'btn' + (this.state.activeKeys.some(k => k.index === key) ? ' active' : '')}
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
      </div>
    )
  }
}

export default Multipick
