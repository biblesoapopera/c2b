import React from 'react'

class Pick extends React.Component {
  constructor(props) {
    super(props)

    let complete = props.complete === 'always'

    this.state = {
      complete: complete,
      score: 0
    }
  }

  render() {
    return (
      <div className="slide pick">
        <div className="question" dangerouslySetInnerHTML={{__html: this.props.question}}></div>

      </div>
    )
  }
}

export default Pick
