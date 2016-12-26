'use strict';

System.register('bso-client/comp/player/slides/Slider', ['react'], function (_export, _context) {
  "use strict";

  var React, _createClass, Slider;

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

      Slider = function (_React$Component) {
        _inherits(Slider, _React$Component);

        function Slider(props) {
          _classCallCheck(this, Slider);

          var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

          var complete = props.complete === 'always';

          _this.state = {
            complete: complete,
            score: 50
          };

          _this.gripState = {
            handlers: {},
            gripScore: 50,
            start: 0
          };
          return _this;
        }

        _createClass(Slider, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
            this.positionGrip(this.state.score);
          }
        }, {
          key: 'positionGrip',
          value: function positionGrip(value) {
            this.grip.style.left = this.track.clientWidth * value / 100 - this.grip.clientWidth / 2 + 'px';
            this.grip.style.top = -(this.grip.clientHeight / 2 - this.track.clientHeight / 2) + 'px';
          }
        }, {
          key: 'trackClick',
          value: function trackClick(evt) {
            var newScore = Math.round((evt.clientX - this.track.getBoundingClientRect().left) * 100 / this.track.clientWidth);
            this.setState({
              score: newScore
            });
            this.positionGrip(newScore);
          }
        }, {
          key: 'dragstart',
          value: function dragstart(evt) {
            this.gripState.handlers = {
              mouseup: this.dragend.bind(this),
              touchend: this.dragend.bind(this),
              mousemove: this.dragmove.bind(this),
              touchmove: this.dragmove.bind(this)
            };
            this.slide.addEventListener('mouseup', this.gripState.handlers.mouseup);
            this.slide.addEventListener('touchend', this.gripState.handlers.touchend);
            this.slide.addEventListener('mousemove', this.gripState.handlers.mousemove);
            this.slide.addEventListener('touchmove', this.gripState.handlers.touchmove);

            this.gripState.start = evt.touches ? evt.touches[0].clientX : evt.clientX;

            this.grip.classList.add('active');
          }
        }, {
          key: 'dragmove',
          value: function dragmove(evt) {
            evt.stopPropagation();
            var delta = (evt.touches ? evt.touches[0].clientX : evt.clientX) - this.gripState.start;
            var tempScore = Math.round(this.state.score + delta * 100 / this.track.clientWidth);

            if (tempScore > 100) tempScore = 100;else if (tempScore < 0) tempScore = 0;

            this.gripState.gripScore = tempScore;
            this.positionGrip(tempScore);
          }
        }, {
          key: 'dragend',
          value: function dragend(evt) {
            evt.stopPropagation();
            this.slide.removeEventListener('mouseup', this.gripState.handlers.mouseup);
            this.slide.removeEventListener('touchend', this.gripState.handlers.touchend);
            this.slide.removeEventListener('mousemove', this.gripState.handlers.mousemove);
            this.slide.removeEventListener('touchmove', this.gripState.handlers.touchmove);

            this.grip.classList.remove('active');
            this.setState({
              score: this.gripState.gripScore
            });
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
              React.createElement('div', { className: 'question', dangerouslySetInnerHTML: { __html: this.props.question } }),
              React.createElement(
                'div',
                { className: 'answer-container' },
                React.createElement(
                  'div',
                  { className: 'track-container' },
                  React.createElement('div', { className: 'track',
                    onClick: this.trackClick.bind(this),
                    ref: function ref(track) {
                      return _this2.track = track;
                    }
                  }),
                  React.createElement('div', {
                    className: 'grip',
                    ref: function ref(grip) {
                      return _this2.grip = grip;
                    },
                    onMouseDown: this.dragstart.bind(this),
                    onTouchStart: this.dragstart.bind(this)
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