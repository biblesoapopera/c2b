'use strict';

System.register('bso-client/comp/modal/LangSwitcherModal', ['react', './LangSwitcherItem'], function (_export, _context) {
  "use strict";

  var React, LangSwitcherItem, _createClass, LangSwitcherModal;

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
    }, function (_LangSwitcherItem) {
      LangSwitcherItem = _LangSwitcherItem.default;
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

      LangSwitcherModal = function (_React$Component) {
        _inherits(LangSwitcherModal, _React$Component);

        function LangSwitcherModal() {
          _classCallCheck(this, LangSwitcherModal);

          return _possibleConstructorReturn(this, (LangSwitcherModal.__proto__ || Object.getPrototypeOf(LangSwitcherModal)).apply(this, arguments));
        }

        _createClass(LangSwitcherModal, [{
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              'div',
              { className: 'lang-switcher-dropdown', onClick: function onClick() {
                  return _this2.props.newLang(_this2.props.lang);
                } },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'ul',
                  null,
                  this.props.store.lang.listNames().map(function (item, key) {
                    return React.createElement(LangSwitcherItem, {
                      key: key,
                      selected: item[0] === _this2.props.lang,
                      name: item[1],
                      value: item[0],
                      newLang: _this2.props.newLang
                    });
                  })
                )
              )
            );
          }
        }]);

        return LangSwitcherModal;
      }(React.Component);

      _export('default', LangSwitcherModal);
    }
  };
});