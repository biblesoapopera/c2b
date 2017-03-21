'use strict';

System.register('bso-client/comp/player/slides/Slider', ['react', '../../blankSquare'], function (_export, _context) {
  "use strict";

  var React, blankSquare, _createClass, Slider;

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
    }, function (_blankSquare) {
      blankSquare = _blankSquare.default;
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

      Slider = function (_React$Component) {
        _inherits(Slider, _React$Component);

        function Slider(props) {
          _classCallCheck(this, Slider);

          var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

          _this.state = {
            complete: props.complete === 'always',
            score: 50,
            gripScore: 50,
            gripLeft: 0,
            gripTop: 0,
            gripStart: 0,
            gripDragging: false,
            gripAnimate: false
          };

          _this.handlers = {
            dragend: _this.dragend.bind(_this),
            dragmove: _this.dragmove.bind(_this),
            resize: _this.resize.bind(_this)
          };
          return _this;
        }

        _createClass(Slider, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
            this.positionGrip(this.state.gripScore);
            window.addEventListener("resize", this.handlers.resize, false);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            window.removeEventListener("resize", this.handlers.resize, false);
            window.removeEventListener('mouseup', this.handlers.dragend, false);
            window.removeEventListener('touchend', this.handlers.dragend, false);
            window.removeEventListener('mousemove', this.handlers.dragmove, false);
            window.removeEventListener('touchmove', this.handlers.dragmove, false);
          }
        }, {
          key: 'resize',
          value: function resize() {
            this.positionGrip(this.state.gripScore);
          }
        }, {
          key: 'positionGrip',
          value: function positionGrip(value) {
            this.setState({
              gripScore: value,
              gripLeft: this.track.clientWidth * value / 100 - this.grip.clientWidth / 2,
              gripTop: this.grip.style.top = -(this.grip.clientHeight / 2 - this.track.clientHeight / 2)
            });
          }
        }, {
          key: 'trackClick',
          value: function trackClick(evt) {
            var newScore = Math.round((evt.clientX - this.track.getBoundingClientRect().left) * 100 / this.track.clientWidth);
            this.setState({
              score: newScore,
              gripAnimate: true
            });
            this.positionGrip(newScore);
          }
        }, {
          key: 'dragstart',
          value: function dragstart(evt) {
            if (evt.type === 'mousedown') evt.preventDefault();

            this.props.disableNav();

            window.addEventListener('mouseup', this.handlers.dragend, false);
            window.addEventListener('touchend', this.handlers.dragend, false);
            window.addEventListener('mousemove', this.handlers.dragmove, false);
            window.addEventListener('touchmove', this.handlers.dragmove, false);

            this.setState({
              gripStart: evt.touches ? evt.touches[0].clientX : evt.clientX,
              gripDragging: true
            });
          }
        }, {
          key: 'dragmove',
          value: function dragmove(evt) {
            evt.stopPropagation();
            var delta = (evt.touches ? evt.touches[0].clientX : evt.clientX) - this.state.gripStart;
            var tempScore = Math.round(this.state.score + delta * 100 / this.track.clientWidth);

            if (tempScore > 100) tempScore = 100;else if (tempScore < 0) tempScore = 0;

            this.positionGrip(tempScore);
          }
        }, {
          key: 'dragend',
          value: function dragend(evt) {
            evt.stopPropagation();
            window.removeEventListener('mouseup', this.handlers.dragend, false);
            window.removeEventListener('touchend', this.handlers.dragend, false);
            window.removeEventListener('mousemove', this.handlers.dragmove, false);
            window.removeEventListener('touchmove', this.handlers.dragmove, false);

            this.props.enableNav();

            this.setState({
              score: this.state.gripScore,
              gripDragging: false
            });
          }
        }, {
          key: 'animateEnd',
          value: function animateEnd() {
            this.setState({ gripAnimate: false });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              'div',
              { className: 'slide slider',
                ref: function ref(slide) {
                  return _this2.slide = slide;
                }
              },
              React.createElement(
                'div',
                { className: 'question' },
                React.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.question } })
              ),
              React.createElement(
                'div',
                { className: 'track-container' },
                React.createElement('div', { className: 'track',
                  onClick: this.trackClick.bind(this),
                  ref: function ref(track) {
                    return _this2.track = track;
                  }
                }),
                React.createElement('img', {
                  className: 'grip ' + (this.state.gripAnimate ? 'animate ' : '') + (this.state.gripDragging ? 'active' : ''),
                  ref: function ref(grip) {
                    return _this2.grip = grip;
                  },
                  onMouseDown: this.dragstart.bind(this),
                  onTouchStart: this.dragstart.bind(this),
                  onTransitionEnd: this.animateEnd.bind(this),
                  src: blankSquare,
                  style: {
                    left: this.state.gripLeft + 'px',
                    top: this.state.gripTop + 'px'
                  }
                })
              ),
              React.createElement(
                'div',
                { className: 'answers' },
                this.props.answers.map(function (answer, key) {
                  return React.createElement(
                    'div',
                    { key: key },
                    answer.value
                  );
                })
              )
            );
          }
        }]);

        return Slider;
      }(React.Component);

      _export('default', Slider);
    }
  };
});