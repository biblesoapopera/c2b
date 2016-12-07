'use strict';

System.register('bso-client/App', ['react', './Background', './Menu', './Splash', './EpisodeChooser', './DeliveryChooser', './i18n/loadLocale', './i18n/isLocaleLoaded', './series/store'], function (_export, _context) {
  "use strict";

  var React, Background, Menu, Splash, EpisodeChooser, DeliveryChooser, loadLocale, isLocaleLoaded, series, _createClass, App;

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
    }, function (_i18nLoadLocale) {
      loadLocale = _i18nLoadLocale.default;
    }, function (_i18nIsLocaleLoaded) {
      isLocaleLoaded = _i18nIsLocaleLoaded.default;
    }, function (_seriesStore) {
      series = _seriesStore.default;
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
            locale: 'en-au',
            route: ['splash']
            //route: ['choose-delivery', 0, 1]
          };

          _this.switchLocale = _this.switchLocale.bind(_this);
          _this.go = _this.go.bind(_this);
          return _this;
        }

        _createClass(App, [{
          key: 'switchLocale',
          value: function switchLocale(locale) {
            var _this2 = this;

            if (!isLocaleLoaded(locale)) {
              loadLocale(locale).then(function () {
                return _this2.setState({ locale: locale });
              });
            } else {
              this.setState({ locale: locale });
            }
          }
        }, {
          key: 'go',
          value: function go(to) {
            this.setState({ route: to });
          }
        }, {
          key: 'render',
          value: function render() {
            var route = this.state.route[0];

            return React.createElement(
              'div',
              { className: 'app' },
              React.createElement(Background, null),
              React.createElement(Menu, { locale: this.state.locale, switchLocale: this.switchLocale }),
              route === 'splash' && React.createElement(Splash, { locale: this.state.locale, go: this.go }),
              route === 'choose-episode' && React.createElement(EpisodeChooser, { locale: this.state.locale, go: this.go, series: series }),
              route === 'choose-delivery' && React.createElement(DeliveryChooser, { locale: this.state.locale, go: this.go, series: this.state.route[1], episode: this.state.route[2] }),
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