'use strict';

System.register('bso-client/comp/App', ['react', './Background', './menu/Menu', './Splash', './episodeChooser/EpisodeChooser', './DeliveryChooser', './player/PlayerContainer', './editor/Editor', './menu/LangSwitcher', './menu/Login', './menu/Hamburger', './menu/Edit', './Loading', './Error'], function (_export, _context) {
  "use strict";

  var React, Background, Menu, Splash, EpisodeChooser, DeliveryChooser, PlayerContainer, Editor, LangSwitcher, Login, Hamburger, Edit, Loading, Error, _createClass, App;

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
    }, function (_menuLangSwitcher) {
      LangSwitcher = _menuLangSwitcher.default;
    }, function (_menuLogin) {
      Login = _menuLogin.default;
    }, function (_menuHamburger) {
      Hamburger = _menuHamburger.default;
    }, function (_menuEdit) {
      Edit = _menuEdit.default;
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

      App = function (_React$Component) {
        _inherits(App, _React$Component);

        function App(props) {
          var _this2 = this;

          _classCallCheck(this, App);

          var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

          _this.state = {
            loading: false,
            err: false,
            country: 'au',
            lang: 'en',
            menu: [],
            user: false,
            //route: []
            route: ['choose-episode']
            //route: ['choose-delivery', 4]
            //route: ['player', '5861e8d8e3ccf715b416561f']
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
                      _this.setState({
                        loading: true
                      });
                      _context2.next = 3;
                      return api.lang.read(lang);

                    case 3:
                      _this.setState({
                        loading: false,
                        lang: lang
                      });

                    case 4:
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

          api.user.set = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
            var user;
            return regeneratorRuntime.wrap(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return api.user.active();

                  case 2:
                    user = _context3.sent;

                    _this.setState({ user: user });

                  case 4:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee2, _this2);
          }));

          var preservedLogout = _this.props.api.user.logout;
          api.user.logout = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var result;
            return regeneratorRuntime.wrap(function _callee3$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _this.setState({ loading: true });

                    _context4.next = 3;
                    return preservedLogout();

                  case 3:
                    result = _context4.sent;

                    if (result) {
                      _context4.next = 8;
                      break;
                    }

                    _this.setState({
                      loading: false,
                      err: 'logout error'
                    });
                    _context4.next = 11;
                    break;

                  case 8:
                    _context4.next = 10;
                    return api.user.set();

                  case 10:
                    _this.setState({
                      loading: false
                    });

                  case 11:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee3, _this2);
          }));

          api.menu = function (buttons) {
            _this.setState({ menu: buttons });
          };

          api.translate = function (context, str) {
            return _this.props.api.translate(_this.state.lang, context, str);
          };

          _this.api = api;
          return _this;
        }

        _createClass(App, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
            this.api.user.set();
          }
        }, {
          key: 'render',
          value: function render() {
            var _this3 = this;

            var route = this.state.route[0];
            var content = void 0;

            var buttons = this.state.menu.map(function (btn) {
              if (btn === 'lang') {
                return React.createElement(LangSwitcher, { key: 'lang', lang: _this3.state.lang, api: _this3.api });
              } else if (btn === 'login') {
                return React.createElement(Login, { key: 'login', api: _this3.api });
              } else if (btn === 'hamburger') {
                return React.createElement(Hamburger, { key: 'hamburger', api: _this3.api });
              } else if (btn === 'edit') {
                return React.createElement(Edit, { key: 'edit', api: _this3.api });
              } else if (typeof btn !== 'string') {
                return btn;
              }
            });

            if (this.state.loading && !this.state.err) {
              content = React.createElement(Loading, null);
            } else if (this.state.err) {
              content = React.createElement(Error, { err: this.state.err });
            } else if (route === void 0) {
              content = React.createElement(Splash, {
                api: this.api,
                user: this.state.user
              });
            } else if (route === 'choose-episode') {
              content = React.createElement(EpisodeChooser, {
                lang: this.state.lang,
                api: this.api
              });
            } else if (route === 'choose-delivery') {
              content = React.createElement(DeliveryChooser, {
                api: this.api,
                episode: this.state.route[1]
              });
            } else if (route === 'player') {
              content = React.createElement(PlayerContainer, {
                episode: this.state.route[1],
                api: this.api
              });
            } else if (route === 'editor') {
              content = React.createElement(Editor, {
                api: this.api,
                lang: this.state.lang
              });
            }

            return React.createElement(
              'div',
              { className: 'app' },
              React.createElement(Background, null),
              React.createElement(Menu, { buttons: buttons }),
              content
            );
          }
        }]);

        return App;
      }(React.Component);

      _export('default', App);
    }
  };
});