'use strict';

System.register('bso-client/comp/menu/LangSwitcher', ['react', '../modal/LangSwitcherModal'], function (_export, _context) {
  "use strict";

  var React, LangSwitcherModal, _createClass, LangSwitcher;

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
    }, function (_modalLangSwitcherModal) {
      LangSwitcherModal = _modalLangSwitcherModal.default;
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

      LangSwitcher = function (_React$Component) {
        _inherits(LangSwitcher, _React$Component);

        function LangSwitcher(props) {
          _classCallCheck(this, LangSwitcher);

          var _this = _possibleConstructorReturn(this, (LangSwitcher.__proto__ || Object.getPrototypeOf(LangSwitcher)).call(this, props));

          _this.state = {
            visible: false
          };
          return _this;
        }

        _createClass(LangSwitcher, [{
          key: 'show',
          value: function show() {
            this.setState({ visible: true });
          }
        }, {
          key: 'newLang',
          value: function newLang(lang) {
            this.setState({ visible: false });
            if (lang !== this.props.lang) this.props.api.lang.switch(lang);
          }
        }, {
          key: 'render',
          value: function render() {
            return React.createElement(
              'div',
              { className: 'lang-switcher' },
              React.createElement(
                'div',
                { className: 'inner', onClick: this.show.bind(this) },
                React.createElement(
                  'div',
                  { className: 'icon' },
                  React.createElement('div', null)
                )
              ),
              this.state.visible && React.createElement(LangSwitcherModal, {
                api: this.props.api,
                lang: this.props.lang,
                newLang: this.newLang.bind(this)
              })
            );
          }
        }]);

        return LangSwitcher;
      }(React.Component);

      _export('default', LangSwitcher);
    }
  };
});