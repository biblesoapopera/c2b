'use strict';

System.register('bso-client/LocaleSwitcher', ['react', './i18n/store', './LocaleSwitcherItem'], function (_export, _context) {
  "use strict";

  var React, store, LocaleSwitcherItem, _createClass, LocaleSwitcher;

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
    }, function (_i18nStore) {
      store = _i18nStore.default;
    }, function (_LocaleSwitcherItem) {
      LocaleSwitcherItem = _LocaleSwitcherItem.default;
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

      LocaleSwitcher = function (_React$Component) {
        _inherits(LocaleSwitcher, _React$Component);

        function LocaleSwitcher(props) {
          _classCallCheck(this, LocaleSwitcher);

          var _this = _possibleConstructorReturn(this, (LocaleSwitcher.__proto__ || Object.getPrototypeOf(LocaleSwitcher)).call(this, props));

          _this.state = {
            visible: false
          };
          return _this;
        }

        _createClass(LocaleSwitcher, [{
          key: 'show',
          value: function show() {
            this.setState({ visible: true });
          }
        }, {
          key: 'hide',
          value: function hide() {
            this.setState({ visible: false });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              'div',
              { className: 'locale-switcher font-menu' },
              React.createElement(
                'div',
                { className: 'head', onClick: this.show.bind(this) },
                React.createElement('img', { src: 'img/globe.png' }),
                this.props.locale.toUpperCase(),
                React.createElement('img', { src: 'img/down.png' })
              ),
              this.state.visible && React.createElement(
                'div',
                { className: 'dropdown', onClick: this.hide.bind(this) },
                React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'ul',
                    null,
                    Object.keys(store).map(function (key) {
                      return React.createElement(LocaleSwitcherItem, {
                        key: key,
                        selected: key === _this2.props.locale,
                        name: store[key].name,
                        value: key,
                        switchLocale: _this2.props.switchLocale,
                        hide: _this2.hide.bind(_this2)
                      });
                    })
                  )
                )
              )
            );
          }
        }]);

        return LocaleSwitcher;
      }(React.Component);

      _export('default', LocaleSwitcher);
    }
  };
});