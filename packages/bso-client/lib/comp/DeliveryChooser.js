'use strict';

System.register('bso-client/comp/DeliveryChooser', ['react', './Loading', './Error'], function (_export, _context) {
  "use strict";

  var React, Loading, Error, _createClass, DeliveryChooser;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

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
    }, function (_Loading) {
      Loading = _Loading.default;
    }, function (_Error) {
      Error = _Error.default;
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

      DeliveryChooser = function (_React$Component) {
        _inherits(DeliveryChooser, _React$Component);

        function DeliveryChooser(props) {
          _classCallCheck(this, DeliveryChooser);

          var _this = _possibleConstructorReturn(this, (DeliveryChooser.__proto__ || Object.getPrototypeOf(DeliveryChooser)).call(this, props));

          _this.state = {
            episodeData: false,
            err: false,
            readingLocal: false,
            readingRemote: false,
            hasAudio: false
          };
          return _this;
        }

        _createClass(DeliveryChooser, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.props.api.menu(['hamburger']);
          }
        }, {
          key: 'componentDidMount',
          value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var res;
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.props.api.episode.readId(this.props.episode);

                    case 2:
                      res = _context2.sent;

                      if (res.status === 200) {
                        this.setState({
                          episodeData: res.body,
                          hasAudio: this.props.api.audio.has(res.body.primaryAudio)
                        });
                      } else {
                        this.setState({ err: res });
                      }

                    case 4:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, this);
            }));

            function componentDidMount() {
              return _ref.apply(this, arguments);
            }

            return componentDidMount;
          }()
        }, {
          key: 'play',
          value: function play() {
            this.props.api.go(['player', this.props.episode]);
          }
        }, {
          key: 'loadLocal',
          value: function loadLocal() {
            var _this2 = this;

            this.setState({ readingLocal: true });

            var input = document.createElement('input');
            input.type = 'file';

            input.addEventListener('change', function () {
              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(evt) {
                var file;
                return regeneratorRuntime.wrap(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        file = evt.target.files[0];
                        _context3.prev = 1;
                        _context3.next = 4;
                        return _this2.props.api.audio.loadLocal(_this2.state.episodeData.primaryAudio, file);

                      case 4:
                        _this2.setState({
                          readingLocal: false,
                          hasAudio: true
                        });
                        _this2.play();
                        _context3.next = 11;
                        break;

                      case 8:
                        _context3.prev = 8;
                        _context3.t0 = _context3['catch'](1);

                        // TODO UI this error
                        console.log(_context3.t0);

                      case 11:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee2, _this2, [[1, 8]]);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

            input.click();
          }
        }, {
          key: 'download',
          value: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
              var fileName, a;
              return regeneratorRuntime.wrap(function _callee3$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      this.setState({ readingRemote: true });

                      fileName = this.state.episodeData.primaryAudio;

                      if (this.state.hasAudio) {
                        _context4.next = 5;
                        break;
                      }

                      _context4.next = 5;
                      return this.props.api.audio.loadRemote(fileName, this.downloadProgess.bind(this));

                    case 5:
                      a = document.createElement('a');

                      a.download = fileName + '.mp3';
                      a.href = this.props.api.audio.get(fileName);
                      a.click();
                      this.setState({
                        readingRemote: false,
                        hasAudio: true
                      });

                    case 10:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee3, this);
            }));

            function download() {
              return _ref3.apply(this, arguments);
            }

            return download;
          }()
        }, {
          key: 'downloadProgess',
          value: function downloadProgess(evt) {
            if (evt.lengthComputable) {
              this.setState({ readingRemote: Math.round(100 * evt.loaded / evt.total) });
            }
          }
        }, {
          key: 'render',
          value: function render() {
            var episodeData = this.state.episodeData;

            var loading = null;
            if ((!episodeData || this.state.readingLocal || this.state.readingRemote) && !this.state.err) {
              loading = React.createElement(Loading, { percentage: this.state.readingRemote });
            }

            var err = null;
            if (this.state.err) {
              err = React.createElement(Error, { err: this.state.err });
            }

            return React.createElement(
              'div',
              { className: 'delivery-chooser' },
              React.createElement(
                'div',
                { className: 'font2' },
                'How would you like to listen to this episode?'
              ),
              episodeData && React.createElement(
                'div',
                { className: 'font3' },
                'S',
                episodeData.series + 1,
                ':E',
                episodeData.episode + 1,
                ' ',
                episodeData.title
              ),
              !episodeData && React.createElement(
                'div',
                { className: 'font3' },
                'S0:E0'
              ),
              React.createElement(
                'div',
                { className: 'btn', onClick: this.play.bind(this) },
                React.createElement(
                  'div',
                  { className: 'font2' },
                  'Play episode now'
                ),
                !this.state.hasAudio && React.createElement(
                  'div',
                  { className: 'font3' },
                  'using streaming audio'
                ),
                this.state.hasAudio && React.createElement(
                  'div',
                  { className: 'font3' },
                  'using already loaded audio'
                )
              ),
              !this.state.hasAudio && React.createElement(
                'div',
                { className: 'btn', onClick: this.loadLocal.bind(this) },
                React.createElement(
                  'div',
                  { className: 'font2' },
                  'Play episode now'
                ),
                React.createElement(
                  'div',
                  { className: 'font3' },
                  'using an audio file on this device'
                )
              ),
              React.createElement(
                'div',
                { className: 'btn', onClick: this.download.bind(this) },
                !this.state.hasAudio && React.createElement(
                  'div',
                  { className: 'font2' },
                  'Download episode audio'
                ),
                this.state.hasAudio && React.createElement(
                  'div',
                  { className: 'font2' },
                  'Save episode audio'
                ),
                React.createElement(
                  'div',
                  { className: 'font3' },
                  'to listen offline and share with friends'
                )
              ),
              loading,
              err
            );
          }
        }]);

        return DeliveryChooser;
      }(React.Component);

      _export('default', DeliveryChooser);
    }
  };
});