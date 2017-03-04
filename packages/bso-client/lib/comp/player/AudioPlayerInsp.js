'use strict';

System.register('bso-client/comp/player/AudioPlayerInsp', ['react'], function (_export, _context) {
  "use strict";

  var React, Component, _createClass, DEFAULT_LISTEN_INTERVAL, ReactAudioPlayer;

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
      Component = _react.Component;
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

      DEFAULT_LISTEN_INTERVAL = 10000;

      ReactAudioPlayer = function (_Component) {
        _inherits(ReactAudioPlayer, _Component);

        function ReactAudioPlayer() {
          _classCallCheck(this, ReactAudioPlayer);

          return _possibleConstructorReturn(this, (ReactAudioPlayer.__proto__ || Object.getPrototypeOf(ReactAudioPlayer)).apply(this, arguments));
        }

        _createClass(ReactAudioPlayer, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
            var _this2 = this;

            var audio = this.audioEl;

            audio.addEventListener('error', function (e) {
              _this2.props.onError && _this2.props.onError(e);
            });

            // When enough of the file has downloaded to start playing
            audio.addEventListener('canplay', function (e) {
              _this2.props.onCanPlay && _this2.props.onCanPlay(e);
            });

            // When enough of the file has downloaded to play the entire file
            audio.addEventListener('canplaythrough', function (e) {
              _this2.props.onCanPlayThrough && _this2.props.onCanPlayThrough(e);
            });

            // When audio play starts
            audio.addEventListener('play', function (e) {
              _this2.setListenTrack();
              _this2.props.onPlay && _this2.props.onPlay(e);
            });

            // When unloading the audio player (switching to another src)
            audio.addEventListener('abort', function (e) {
              _this2.clearListenTrack();
              _this2.props.onAbort && _this2.props.onAbort(e);
            });

            // When the file has finished playing to the end
            audio.addEventListener('ended', function (e) {
              _this2.clearListenTrack();
              _this2.props.onEnded && _this2.props.onEnded(e);
            });

            // When the user pauses playback
            audio.addEventListener('pause', function (e) {
              _this2.clearListenTrack();
              _this2.props.onPause && _this2.props.onPause(e);
            });

            // When the user drags the time indicator to a new time
            audio.addEventListener('seeked', function (e) {
              _this2.clearListenTrack();
              _this2.props.onSeeked && _this2.props.onSeeked(e);
            });
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedPlayerEvent) {
              var audio = this.audioEl;

              audio.currentTime = nextProps.selectedPlayerEvent.playTime;
              audio.play();
            }
          }
        }, {
          key: 'setListenTrack',
          value: function setListenTrack() {
            var _this3 = this;

            if (!this.listenTracker) {
              var listenInterval = this.props.listenInterval || DEFAULT_LISTEN_INTERVAL;
              this.listenTracker = setInterval(function () {
                _this3.props.onListen && _this3.props.onListen(_this3.audioEl.currentTime);
              }, listenInterval);
            }
          }
        }, {
          key: 'clearListenTrack',
          value: function clearListenTrack() {
            if (this.listenTracker) {
              clearInterval(this.listenTracker);
              this.listenTracker = null;
            }
          }
        }, {
          key: 'render',
          value: function render() {
            var _this4 = this;

            var incompatibilityMessage = this.props.children || React.createElement(
              'p',
              null,
              'Your browser does not support the ',
              React.createElement(
                'code',
                null,
                'audio'
              ),
              ' element.'
            );

            // Set controls to be true by default unless explicity stated otherwise
            var controls = !(this.props.controls === false);

            return React.createElement(
              'audio',
              {
                className: 'react-audio-player ' + this.props.className,
                style: this.props.style,
                src: this.props.src || '',
                autoPlay: this.props.autoPlay,
                preload: this.props.preload,
                controls: controls,
                ref: function ref(_ref) {
                  _this4.audioEl = _ref;
                },
                onPlay: this.onPlay
              },
              incompatibilityMessage
            );
          }
        }]);

        return ReactAudioPlayer;
      }(Component);

      _export('default', ReactAudioPlayer);
    }
  };
});