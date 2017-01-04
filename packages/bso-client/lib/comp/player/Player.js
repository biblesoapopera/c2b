'use strict';

System.register('bso-client/comp/player/Player', ['react', './slides/Text', './slides/Slider', './slides/Pick', '../Swipe', '../Loading', '../Error'], function (_export, _context) {
  "use strict";

  var React, Text, Slider, Pick, Swipe, Loading, Error, _createClass, Player;

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
    }, function (_Swipe) {
      Swipe = _Swipe.default;
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

      Player = function (_React$Component) {
        _inherits(Player, _React$Component);

        function Player(props) {
          _classCallCheck(this, Player);

          var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

          _this.state = {
            slide: 3,
            err: false,
            episodeData: false
          };
          return _this;
        }

        _createClass(Player, [{
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
          key: 'next',
          value: function next() {
            if (this.state.slide !== this.state.episodeData.slides.length - 1) {
              this.setState({ slide: this.state.slide + 1 });
            }
          }
        }, {
          key: 'previous',
          value: function previous() {
            if (this.state.slide !== 0) {
              this.setState({ slide: this.state.slide - 1 });
            }
          }
        }, {
          key: 'audio',
          value: function audio() {
            console.log('Play audio');
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            var activeSlide = void 0;
            var episodeData = this.state.episodeData;

            if (!episodeData && !this.state.err) {
              return React.createElement(Loading, null);
            }

            if (this.state.err) {
              return React.createElement(Error, { err: this.state.err });
            }

            if (episodeData && !this.state.err) {
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
                    episodeData.slides.map(function (slideObj, key) {
                      var type = void 0;
                      var slide = void 0;
                      var slideJsx = void 0;

                      if (slideObj.text) type = 'text';else if (slideObj.slider) type = 'slider';else if (slideObj.listen) type = 'listen';else if (slideObj.pick) type = 'pick';else if (slideObj.multipick) type = 'multipick';

                      slide = slideObj[type];

                      if (key === _this2.state.slide) activeSlide = slide;

                      if (type === 'text') {
                        slideJsx = React.createElement(Text, {
                          text: slide.text,
                          focused: key === _this2.state.slide
                        });
                      } else if (type === 'slider') {
                        slideJsx = React.createElement(Slider, {
                          question: slide.question,
                          answers: slide.answers,
                          feedback: slide.feedback,
                          complete: slide.complete,
                          focused: key === _this2.state.slide
                        });
                      } else if (type === 'pick') {
                        slideJsx = React.createElement(Pick, {
                          question: slide.question,
                          answers: slide.answers,
                          feedback: slide.feedback,
                          complete: slide.complete,
                          focused: key === _this2.state.slide
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
                    { className: 'previous btn ' + (this.state.slide !== 0 ? '' : 'hide'), onClick: this.previous.bind(this) },
                    React.createElement(
                      'div',
                      null,
                      React.createElement('div', null)
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'audio btn ' + (activeSlide.audio ? '' : 'hide'), onClick: this.audio.bind(this) },
                    React.createElement(
                      'div',
                      null,
                      React.createElement('div', null)
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'next btn ' + (this.state.slide !== episodeData.slides.length - 1 ? '' : 'hide'), onClick: this.next.bind(this) },
                    React.createElement(
                      'div',
                      null,
                      React.createElement('div', null)
                    )
                  )
                )
              );
            }
          }
        }]);

        return Player;
      }(React.Component);

      _export('default', Player);
    }
  };
});