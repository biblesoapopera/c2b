'use strict';

System.register('bso-client/Splash', ['react', './i18n/getTranslateFn'], function (_export, _context) {
  "use strict";

  var React, getTranslateFn, _createClass, Splash;

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
    }, function (_i18nGetTranslateFn) {
      getTranslateFn = _i18nGetTranslateFn.default;
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

      Splash = function (_React$Component) {
        _inherits(Splash, _React$Component);

        function Splash() {
          _classCallCheck(this, Splash);

          return _possibleConstructorReturn(this, (Splash.__proto__ || Object.getPrototypeOf(Splash)).apply(this, arguments));
        }

        _createClass(Splash, [{
          key: 'enter',
          value: function enter() {
            this.props.go(['choose-episode']);
          }
        }, {
          key: 'render',
          value: function render() {
            var tr = getTranslateFn(this.props.locale, 'splash');

            return React.createElement(
              'div',
              { className: 'splash' },
              React.createElement(
                'h1',
                { className: 'font0' },
                tr('Cursed to Bless')
              ),
              React.createElement(
                'h2',
                { className: 'font1' },
                tr('a bible teaching drama')
              ),
              React.createElement(
                'div',
                { className: 'btn font2', onClick: this.enter.bind(this) },
                tr('join the story')
              )
            );
          }
        }]);

        return Splash;
      }(React.Component);

      _export('default', Splash);
    }
  };
});