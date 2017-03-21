'use strict';

System.register('bso-client/comp/player/Player', ['react', './slides/Text', './slides/Slider', './slides/Pick', './slides/Listen', '../Swipe', './Tracker', '../Loading', '../Error', './audioPlayer', '../blankSquare'], function (_export, _context) {
  "use strict";

  var React, Text, Slider, Pick, Listen, Swipe, Tracker, Loading, Error, audioPlayer, blankSquare, _slicedToArray, _createClass, Player;

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
    }, function (_slidesText) {
      Text = _slidesText.default;
    }, function (_slidesSlider) {
      Slider = _slidesSlider.default;
    }, function (_slidesPick) {
      Pick = _slidesPick.default;
    }, function (_slidesListen) {
      Listen = _slidesListen.default;
    }, function (_Swipe) {
      Swipe = _Swipe.default;
    }, function (_Tracker) {
      Tracker = _Tracker.default;
    }, function (_Loading) {
      Loading = _Loading.default;
    }, function (_Error) {
      Error = _Error.default;
    }, function (_audioPlayer) {
      audioPlayer = _audioPlayer.default;
    }, function (_blankSquare) {
      blankSquare = _blankSquare.default;
    }],
    execute: function () {
      _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

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

      Player = function (_React$Component) {
        _inherits(Player, _React$Component);

        function Player(props) {
          _classCallCheck(this, Player);

          var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

          _this.state = {
            slide: 2,
            err: false,
            episodeData: false,
            loadingAudio: false,
            navDisabled: false
          };

          _this.audioFiles = {};
          return _this;
        }

        _createClass(Player, [{
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
                        this.setState({ episodeData: res.body });
                        this.loadAudio(res.body);
                        this.updateMenu(this.state.slide + 1, res.body.slides.length);
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
          key: 'updateMenu',
          value: function updateMenu(current, total) {
            var tracker = React.createElement(Tracker, {
              key: 'slide-tracker',
              current: current,
              total: total
            });
            this.props.api.menu([tracker, 'hamburger']);
          }
        }, {
          key: 'loadAudio',
          value: function loadAudio(episodeData) {
            var _this2 = this;

            // load audio files in order of need
            var audioFiles = episodeData.slides.reduce(function (previous, slideObj, key) {
              var slide = _this2.slideObjToSlide(slideObj)[0];
              if (slide.audio && previous.indexOf(slide.audio.file) === -1) previous.push(slide.audio.file);
              return previous;
            }, []);

            audioFiles.filter(function (file) {
              if (_this2.props.api.audio.has(file)) {
                _this2.audioFiles[file] = { ready: true };
                return false;
              } else {
                var outerResolve = void 0;
                var outerReject = void 0;
                var readyPromise = new Promise(function (resolve, reject) {
                  outerResolve = resolve;
                  outerReject = reject;
                });
                _this2.audioFiles[file] = {
                  ready: false,
                  readyPromise: readyPromise,
                  resolve: outerResolve,
                  reject: outerReject,
                  progress: 0
                };
                return true;
              }
            }).reduce(function (p, file) {
              return p.then(_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _this2.props.api.audio.loadRemote(file, function (evt) {
                          if (evt.lengthComputable) {
                            _this2.audioFiles[file].progress = Math.round(100 * evt.loaded / evt.total);
                          }
                        });

                      case 2:
                        _this2.audioFiles[file].ready = true;
                        _this2.audioFiles[file].resolve();

                      case 4:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee2, _this2);
              })));
            }, Promise.resolve());
          }
        }, {
          key: 'slideObjToSlide',
          value: function slideObjToSlide(slideObj) {
            var slide = void 0;
            var type = void 0;

            if (slideObj.text) type = 'text';else if (slideObj.slider) type = 'slider';else if (slideObj.listen) type = 'listen';else if (slideObj.pick) type = 'pick';else if (slideObj.multipick) type = 'multipick';

            slide = slideObj[type];

            return [slide, type];
          }
        }, {
          key: 'next',
          value: function next() {
            if (this.state.navDisabled) return;

            if (this.state.slide !== this.state.episodeData.slides.length - 1) {
              if (this.audioPlayer) {
                this.audioPlayer.kill();
                this.audioPlayer = undefined;
              }
              this.updateMenu(this.state.slide + 2, this.state.episodeData.slides.length);
              this.setState({ slide: this.state.slide + 1 });
            }
          }
        }, {
          key: 'previous',
          value: function previous() {
            if (this.state.navDisabled) return;

            if (this.state.slide !== 0) {
              if (this.audioPlayer) {
                this.audioPlayer.kill();
                this.audioPlayer = undefined;
              }
              this.updateMenu(this.state.slide, this.state.episodeData.slides.length);
              this.setState({ slide: this.state.slide - 1 });
            }
          }
        }, {
          key: 'enableNav',
          value: function enableNav() {
            this.setState({ navDisabled: false });
          }
        }, {
          key: 'disableNav',
          value: function disableNav() {
            this.setState({ navDisabled: true });
          }
        }, {
          key: 'audio',
          value: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
              var slide, file;
              return regeneratorRuntime.wrap(function _callee3$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      slide = this.slideObjToSlide(this.state.episodeData.slides[this.state.slide])[0];
                      file = slide.audio.file;

                      if (this.audioFiles[file].ready) {
                        _context4.next = 7;
                        break;
                      }

                      this.setState({ loadingAudio: true });
                      _context4.next = 6;
                      return this.audioFiles[file].readyPromise;

                    case 6:
                      this.setState({ loadingAudio: false });

                    case 7:

                      this.audioPlayer = audioPlayer(this.props.api.audio.get(file), slide.audio.start, slide.audio.end);
                      this.audioPlayer.play();

                    case 9:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee3, this);
            }));

            function audio() {
              return _ref3.apply(this, arguments);
            }

            return audio;
          }()
        }, {
          key: 'render',
          value: function render() {
            var _this3 = this;

            var activeSlide = void 0;
            var activeType = void 0;

            var episodeData = this.state.episodeData;

            var loading = null;
            if ((!episodeData || this.state.loadingAudio) && !this.state.err) {
              loading = React.createElement(Loading, null);
            }

            var err = null;
            if (this.state.err) {
              err = React.createElement(Error, { err: this.state.err });
            }

            return React.createElement(
              'div',
              { className: 'player' },
              React.createElement(
                Swipe,
                {
                  className: 'slide-swipe',
                  onSwipeLeft: this.next.bind(this),
                  onSwipeRight: this.previous.bind(this)
                },
                React.createElement(
                  'div',
                  {
                    className: 'slide-list',
                    style: { left: -100 * this.state.slide + '%' }
                  },
                  episodeData && episodeData.slides.map(function (slideObj, key) {
                    var type = void 0;
                    var slide = void 0;
                    var slideJsx = void 0;

                    var _slideObjToSlide = _this3.slideObjToSlide(slideObj);

                    var _slideObjToSlide2 = _slicedToArray(_slideObjToSlide, 2);

                    slide = _slideObjToSlide2[0];
                    type = _slideObjToSlide2[1];


                    if (key === _this3.state.slide) {
                      activeSlide = slide;
                      activeType = type;
                    }

                    if (type === 'text') {
                      slideJsx = React.createElement(Text, {
                        text: slide.text,
                        focused: key === _this3.state.slide
                      });
                    } else if (type === 'slider') {
                      slideJsx = React.createElement(Slider, {
                        question: slide.question,
                        answers: slide.answers,
                        feedback: slide.feedback,
                        complete: slide.complete,
                        focused: key === _this3.state.slide,
                        enableNav: _this3.enableNav.bind(_this3),
                        disableNav: _this3.disableNav.bind(_this3)
                      });
                    } else if (type === 'pick') {
                      slideJsx = React.createElement(Pick, {
                        question: slide.question,
                        answers: slide.answers,
                        feedback: slide.feedback,
                        complete: slide.complete,
                        focused: key === _this3.state.slide
                      });
                    } else if (type === 'listen') {
                      slideJsx = React.createElement(Listen, {
                        text: slide.text,
                        focused: key === _this3.state.slide
                      });
                    }

                    return React.createElement(
                      'div',
                      { className: 'slide-container', key: key },
                      slideJsx
                    );
                  })
                )
              ),
              React.createElement(
                'div',
                { className: 'nav' },
                React.createElement(
                  'div',
                  { className: 'previous ' + (this.state.slide !== 0 ? '' : 'fade'), onClick: this.previous.bind(this) },
                  React.createElement('img', { src: blankSquare })
                ),
                React.createElement(
                  'div',
                  { className: 'audio ' + (activeType !== 'listen' && activeSlide && activeSlide.audio ? '' : 'fade'), onClick: this.audio.bind(this) },
                  React.createElement('img', { src: blankSquare })
                ),
                React.createElement(
                  'div',
                  { className: 'next ' + (episodeData && this.state.slide !== episodeData.slides.length - 1 ? '' : 'fade'), onClick: this.next.bind(this) },
                  React.createElement('img', { src: blankSquare })
                )
              ),
              loading,
              err
            );
          }
        }]);

        return Player;
      }(React.Component);

      _export('default', Player);
    }
  };
});