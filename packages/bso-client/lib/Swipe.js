'use strict';

System.register('bso-client/Swipe', ['react'], function (_export, _context) {
  "use strict";

  var React, _createClass, PropTypes, ReactSwipe;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_react) {
      React = _react.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      PropTypes = React.PropTypes;

      ReactSwipe = function (_React$Component) {
        _inherits(ReactSwipe, _React$Component);

        function ReactSwipe() {
          _classCallCheck(this, ReactSwipe);

          return _possibleConstructorReturn(this, (ReactSwipe.__proto__ || Object.getPrototypeOf(ReactSwipe)).apply(this, arguments));
        }

        _createClass(ReactSwipe, [{
          key: 'swipeStart',
          value: function swipeStart(e) {
            var _e$touches$ = e.touches[0],
                pageX = _e$touches$.pageX,
                pageY = _e$touches$.pageY;

            this.touchStart = { pageX: pageX, pageY: pageY };
            this.props.onSwipeStart();
          }
        }, {
          key: 'swipeMove',
          value: function swipeMove(e) {
            var deltaX = e.touches[0].pageX - this.touchStart.pageX;
            var deltaY = e.touches[0].pageY - this.touchStart.pageY;
            this.swiping = true;

            // handling the responsability of cancelling the scroll to
            // the component handling the event
            var shouldPreventDefault = this.props.onSwipeMove({
              x: deltaX,
              y: deltaY
            });

            if (shouldPreventDefault) {
              e.preventDefault();
            }

            this.touchPosition = { deltaX: deltaX, deltaY: deltaY };
          }
        }, {
          key: 'swipeEnd',
          value: function swipeEnd() {
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
        }, {
          key: 'render',
          value: function render() {
            return React.createElement(
              this.props.tagName,
              {
                onTouchMove: this.swipeMove.bind(this),
                onTouchStart: this.swipeStart.bind(this),
                onTouchEnd: this.swipeEnd.bind(this),
                className: this.props.className,
                style: this.props.style
              },
              this.props.children
            );
          }
        }]);

        return ReactSwipe;
      }(React.Component);

      ReactSwipe.propTypes = {
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
      };
      ReactSwipe.defaultProps = {
        tagName: 'div',
        onSwipeUp: function onSwipeUp() {},
        onSwipeDown: function onSwipeDown() {},
        onSwipeLeft: function onSwipeLeft() {},
        onSwipeRight: function onSwipeRight() {},
        onSwipeStart: function onSwipeStart() {},
        onSwipeMove: function onSwipeMove() {},
        onSwipeEnd: function onSwipeEnd() {}
      };


      ReactSwipe.displayName = 'ReactSwipe';

      _export('default', ReactSwipe);
    }
  };
});