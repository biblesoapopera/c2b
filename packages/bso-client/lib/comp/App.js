'use strict';

System.register('bso-client/comp/App', ['react', './Background', './Menu', './Splash', './EpisodeChooser', './DeliveryChooser', '../translate', '../store'], function (_export, _context) {
  "use strict";

  var React, Background, Menu, Splash, EpisodeChooser, DeliveryChooser, translate, store, _createClass, App;

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
    }, function (_Menu) {
      Menu = _Menu.default;
    }, function (_Splash) {
      Splash = _Splash.default;
    }, function (_EpisodeChooser) {
      EpisodeChooser = _EpisodeChooser.default;
    }, function (_DeliveryChooser) {
      DeliveryChooser = _DeliveryChooser.default;
    }, function (_translate) {
      translate = _translate.default;
    }, function (_store) {
      store = _store.default;
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
          _classCallCheck(this, App);

          var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

          _this.state = {
            country: 'australia',
            lang: 'en',
            //route: ['splash']
            //route: ['choose-episode']
            route: ['choose-delivery', 4]
          };

          _this.switchLang(_this.state.lang);
          return _this;
        }

        _createClass(App, [{
          key: 'switchLang',
          value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(lang) {
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return store.lang.load(lang);

                    case 2:
                      this.setState({ lang: lang });

                    case 3:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, this);
            }));

            function switchLang(_x) {
              return _ref.apply(this, arguments);
            }

            return switchLang;
          }()
        }, {
          key: 'go',
          value: function go(to) {
            this.setState({ route: to });
          }
        }, {
          key: 'tr',
          value: function tr(lang) {
            return function (context, str) {
              return translate(lang, context, str);
            };
          }
        }, {
          key: 'render',
          value: function render() {
            var route = this.state.route[0];

            return React.createElement(
              'div',
              { className: 'app' },
              React.createElement(Background, null),
              React.createElement(Menu, { lang: this.state.lang, store: store, switchLang: this.switchLang.bind(this) }),
              route === 'splash' && React.createElement(Splash, { go: this.go.bind(this), tr: this.tr(this.state.lang) }),
              route === 'choose-episode' && React.createElement(EpisodeChooser, {
                lang: this.state.lang,
                switchLang: this.switchLang.bind(this),
                go: this.go.bind(this),
                store: store,
                tr: this.tr(this.state.lang)
              }),
              route === 'choose-delivery' && React.createElement(DeliveryChooser, {
                go: this.go.bind(this),
                episode: this.state.route[1],
                tr: this.tr(this.state.lang)
              }),
              route === 'episode' && React.createElement('div', null)
            );
          }
        }]);

        return App;
      }(React.Component);

      _export('default', App);
    }
  };
});