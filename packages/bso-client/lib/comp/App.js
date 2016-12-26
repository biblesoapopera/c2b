'use strict';

System.register('bso-client/comp/App', ['react', './Background', './menu/Menu', './Splash', './episodeChooser/EpisodeChooser', './DeliveryChooser', './player/PlayerContainer', './editor/Editor', './editor/AudioEditor'], function (_export, _context) {
  "use strict";

  var React, Background, Menu, Splash, EpisodeChooser, DeliveryChooser, PlayerContainer, Editor, AudioEditor, _createClass, App;

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
    }, function (_Background) {
      Background = _Background.default;
    }, function (_menuMenu) {
      Menu = _menuMenu.default;
    }, function (_Splash) {
      Splash = _Splash.default;
    }, function (_episodeChooserEpisodeChooser) {
      EpisodeChooser = _episodeChooserEpisodeChooser.default;
    }, function (_DeliveryChooser) {
      DeliveryChooser = _DeliveryChooser.default;
    }, function (_playerPlayerContainer) {
      PlayerContainer = _playerPlayerContainer.default;
    }, function (_editorEditor) {
      Editor = _editorEditor.default;
    }, function (_editorAudioEditor) {
      AudioEditor = _editorAudioEditor.default;
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

      App = function (_React$Component) {
        _inherits(App, _React$Component);

        function App(props) {
          var _this2 = this;

          _classCallCheck(this, App);

          var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

          _this.state = {
            country: 'au',
            lang: 'en',
            menu: [],
            user: false,
            //route: []
            //route: ['choose-episode']
            //route: ['choose-delivery', 4]
            route: ['player', '5860d2d2fdb53f210ca32efb']
            //route: ['editor']
          };

          var api = {};
          Object.keys(_this.props.api).forEach(function (key) {
            return api[key] = _this.props.api[key];
          });

          api.lang.switch = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(lang) {
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return api.lang.read(lang);

                    case 2:
                      _this.setState({ lang: lang });

                    case 3:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, _this2);
            }));

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }();

          api.go = function (to) {
            _this.setState({ route: to });
          };

          api.loading = {
            show: function show() {
              return _this.setState({ loading: true });
            },
            hide: function hide() {
              return _this.setState({ loading: false });
            }
          };

          api.user.set = function () {
            _this.setState(api.user.active);
          };

          api.menu = function (buttons) {
            _this.setState({ menu: buttons });
          };

          api.translate = function (context, str) {
            _this.props.api.translate(_this.state.lang, context, str);
          };

          _this.api = api;
          return _this;
        }

        _createClass(App, [{
          key: 'render',
          value: function render() {
            var route = this.state.route[0];

            return React.createElement(
              'div',
              { className: 'app' },
              React.createElement(Background, null),
              React.createElement(Menu, {
                buttons: this.state.menu,
                lang: this.state.lang,
                api: this.api
              }),
              route === void 0 && React.createElement(Splash, {
                api: this.api
              }),
              route === 'choose-episode' && React.createElement(EpisodeChooser, {
                lang: this.state.lang,
                api: this.api
              }),
              route === 'choose-delivery' && React.createElement(DeliveryChooser, {
                api: this.api,
                episode: this.state.route[1]
              }),
              route === 'player' && React.createElement(PlayerContainer, {
                episode: this.state.route[1],
                api: this.api
              }),
              route === 'editor' && React.createElement(Editor, {
                api: this.api,
                lang: this.state.lang
              }),
              route === 'audio-editor' && React.createElement(AudioEditor, {
                api: this.api
              })
            );
          }
        }]);

        return App;
      }(React.Component);

      _export('default', App);
    }
  };
});