import React from 'react'

class Edit extends React.Component {
  go() {
    this.props.api.go(['editor'])
  }

  render() {
    return (
      <div className="edit">
        <div className="inner" onClick={::this.go}>
          <div className="icon">
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Edit
