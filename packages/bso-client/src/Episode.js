import React from 'react'

class Episode extends React.Component {
  select() {
    this.props.select(this.props.episodeNum)
  }

  render() {
    return (
      <div className='episode'>
        <div className={'preview' + (this.props.selected ? ' selected' : '')} onClick={::this.select}>
          <div className="preview-img" style={{backgroundImage: "url('" + this.props.img + "')"}}>
            <div className="title font3">{this.props.title}</div>
          </div>
        </div>
        <div className="arrow-container">{this.props.selected && <div className="arrow-down"></div>}</div>
      </div>
    )
  }
}

export default Episode
