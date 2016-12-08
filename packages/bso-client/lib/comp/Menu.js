'use strict';

System.register('bso-client/comp/Menu', ['react', './LangSwitcher'], function (_export, _context) {
  "use strict";

  var React, LangSwitcher, _createClass, Menu;

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
    }, function (_LangSwitcher) {
      LangSwitcher = _LangSwitcher.default;
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

      Menu = function (_React$Component) {
        _inherits(Menu, _React$Component);

        function Menu() {
          _classCallCheck(this, Menu);

          return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
        }

        _createClass(Menu, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              'div',
              { className: 'menu' },
              React.createElement(
                'div',
                { className: 'logo font-logo' },
                'C2B'
              ),
              React.createElement(LangSwitcher, {
                lang: this.props.lang,
                country: this.props.country,
                switchLang: this.props.switchLang,
                store: this.props.store
              })
            );
          }
        }]);

        return Menu;
      }(React.Component);

      _export('default', Menu);
    }
  };
});