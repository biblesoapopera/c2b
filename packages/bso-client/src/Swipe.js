import React from 'react'

const PropTypes = React.PropTypes

class ReactSwipe extends React.Component {
  static propTypes = {
    tagName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    onSwipeUp: PropTypes.func,
    onSwipeDown: PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    onSwipeStart: PropTypes.func,
    onSwipeMove: PropTypes.func,
    onSwipeEnd: PropTypes.func
  }

  static defaultProps = {
    tagName: 'div',
    onSwipeUp() {},
    onSwipeDown() {},
    onSwipeLeft() {},
    onSwipeRight() {},
    onSwipeStart() {},
    onSwipeMove() {},
    onSwipeEnd() {}
  }

  swipeStart(e) {
    const { pageX, pageY } = e.touches[0];
    this.touchStart = { pageX, pageY };
    this.props.onSwipeStart();
  }

  swipeMove(e) {
    const deltaX = e.touches[0].pageX - this.touchStart.pageX;
    const deltaY = e.touches[0].pageY - this.touchStart.pageY;
    this.swiping = true;

    // handling the responsability of cancelling the scroll to
    // the component handling the event
    const shouldPreventDefault = this.props.onSwipeMove({
      x: deltaX,
      y: deltaY
    });

    if (shouldPreventDefault) {
      e.preventDefault();
    }

    this.touchPosition = { deltaX, deltaY };
  }

  swipeEnd() {
    if (this.swiping) {
      if (this.touchPosition.deltaX < 0) {
        this.props.onSwipeLeft(1);
      } else if (this.touchPosition.deltaX > 0) {
        this.props.onSwipeRight(1);
      }
      if (this.touchPosition.deltaY < 0) {
        this.props.onSwipeUp(1);
      } else if (this.touchPosition.deltaY > 0) {
        this.props.onSwipeDown(1);
      }
    }
    this.props.onSwipeEnd();
    this.touchStart = null;
    this.swiping = false;
    this.touchPosition = null;
  }

  render() {
    return (
      <this.props.tagName
        onTouchMove = { ::this.swipeMove }
        onTouchStart = { ::this.swipeStart }
        onTouchEnd = { ::this.swipeEnd }
        className = { this.props.className }
        style = { this.props.style }
      >

        { this.props.children }

      </this.props.tagName>
    );
  }
}

ReactSwipe.displayName = 'ReactSwipe';

export default ReactSwipe;
