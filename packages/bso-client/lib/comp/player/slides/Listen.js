'use strict';

System.register('bso-client/comp/player/slides/Listen', ['../../blankSquare', 'react', '../audioPlayer'], function (_export, _context) {
  "use strict";

  var blankSquare, React, audioPlayer, _createClass, Listen;

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
    setters: [function (_blankSquare) {
      blankSquare = _blankSquare.default;
    }, function (_react) {
      React = _react.default;
    }, function (_audioPlayer) {
      audioPlayer = _audioPlayer.default;
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

      Listen = function (_React$Component) {
        _inherits(Listen, _React$Component);

        function Listen(props) {
          _classCallCheck(this, Listen);

          var _this = _possibleConstructorReturn(this, (Listen.__proto__ || Object.getPrototypeOf(Listen)).call(this, props));

          _this.state = {
            playing: false,
            percComplete: 0,
            progressWidth: 0,
            progressAnimate: true,
            gripPercComplete: 0,
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

        _createClass(Listen, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
            this.positionGrip(this.state.gripPercComplete);
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
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            if (nextProps.focused === this.props.focused) return;

            if (!nextProps.focused && this.state.playing) {
              this.audioPlayer.pause();
              this.setState({ playing: false });
            }
          }
        }, {
          key: 'resize',
          value: function resize() {
            this.positionGrip(this.state.gripPercComplete);
          }
        }, {
          key: 'positionGrip',
          value: function positionGrip(value) {
            this.setState({
              gripPercComplete: value,
              gripLeft: this.track.clientWidth * value / 100 - this.grip.clientWidth / 2,
              gripTop: this.grip.style.top = -(this.grip.clientHeight / 2 - this.track.clientHeight / 2),
              progressWidth: value
            });
          }
        }, {
          key: 'trackClick',
          value: function trackClick(evt) {
            var newPercComplete = Math.round((evt.clientX - this.track.getBoundingClientRect().left) * 100 / this.track.clientWidth);

            if (this.audioPlayer) {
              this.audioPlayer.jump(this.props.audioStart + (this.props.audioEnd - this.props.audioStart) * newPercComplete / 100);
            }

            this.setState({
              percComplete: newPercComplete,
              gripAnimate: true
            });
            this.positionGrip(newPercComplete);
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

            if (this.state.playing) this.audioPlayer.pause();

            this.setState({
              gripStart: evt.touches ? evt.touches[0].clientX : evt.clientX,
              gripDragging: true,
              progressAnimate: false
            });
          }
        }, {
          key: 'dragmove',
          value: function dragmove(evt) {
            evt.stopPropagation();
            var delta = (evt.touches ? evt.touches[0].clientX : evt.clientX) - this.state.gripStart;
            var tempPercComplete = Math.round(this.state.percComplete + delta * 100 / this.track.clientWidth);

            if (tempPercComplete > 100) tempPercComplete = 100;else if (tempPercComplete < 0) tempPercComplete = 0;

            this.positionGrip(tempPercComplete);
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

            if (this.audioPlayer) {
              this.audioPlayer.jump(this.props.audioStart + (this.props.audioEnd - this.props.audioStart) * this.state.gripPercComplete / 100);
            }

            if (this.state.playing) this.audioPlayer.play();

            this.setState({
              percComplete: this.state.gripPercComplete,
              gripDragging: false,
              progressAnimate: true
            });
          }
        }, {
          key: 'animateEnd',
          value: function animateEnd() {
            this.setState({ gripAnimate: false });
          }
        }, {
          key: 'togglePlay',
          value: function togglePlay() {
            var _this2 = this;

            if (!this.audioPlayer && this.state.percComplete !== 100) {
              this.audioPlayer = audioPlayer(this.props.audioFile, this.props.audioStart + (this.props.audioEnd - this.props.audioStart) * this.state.percComplete / 100, this.props.audioEnd, this.progress.bind(this));
              this.audioPlayer.done.then(function () {
                _this2.audioPlayer = undefined;
                _this2.setState({
                  percComplete: 100,
                  gripAnimate: true,
                  playing: false
                });
                _this2.positionGrip(100);
              });
            }

            if (this.state.playing) {
              this.audioPlayer.pause();
              this.setState({ playing: false });
            } else if (this.state.percComplete === 100) {
              this.setState({ percComplete: 0 });
              this.positionGrip(0);
            } else {
              this.audioPlayer.play();
              this.setState({ playing: true });
            }
          }
        }, {
          key: 'progress',
          value: function progress(currentTime) {
            var newPercComplete = 100 * (currentTime - this.props.audioStart) / (this.props.audioEnd - this.props.audioStart);
            this.setState({
              percComplete: newPercComplete,
              gripAnimate: true
            });
            this.positionGrip(newPercComplete);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this3 = this;

            var playerBtn = void 0;
            if (this.state.playing) playerBtn = 'pause';else if (this.state.percComplete === 100) playerBtn = 'rewind';else playerBtn = 'play';

            return React.createElement(
              'div',
              { className: 'slide listen' },
              React.createElement(
                'div',
                { className: 'listen-text' },
                React.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.text } })
              ),
              React.createElement(
                'div',
                { className: 'track-container' },
                React.createElement('div', { className: 'progress ' + (this.state.progressAnimate ? 'animate' : ''),
                  style: {
                    width: this.state.progressWidth + '%'
                  }
                }),
                React.createElement('div', { className: 'track',
                  onClick: this.trackClick.bind(this),
                  ref: function ref(track) {
                    return _this3.track = track;
                  }
                }),
                React.createElement('img', {
                  className: 'grip ' + (this.state.gripAnimate ? 'animate ' : '') + (this.state.gripDragging ? 'active' : ''),
                  ref: function ref(grip) {
                    return _this3.grip = grip;
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
                {
                  className: 'control',
                  onClick: this.togglePlay.bind(this)
                },
                React.createElement('img', {
                  className: 'player-btn ' + playerBtn,
                  src: blankSquare
                })
              )
            );
          }
        }]);

        return Listen;
      }(React.Component);

      _export('default', Listen);
    }
  };
});