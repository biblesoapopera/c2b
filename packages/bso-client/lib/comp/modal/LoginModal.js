'use strict';

System.register('bso-client/comp/modal/LoginModal', ['react'], function (_export, _context) {
  "use strict";

  var React, _createClass, LoginModal;

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

      LoginModal = function (_React$Component) {
        _inherits(LoginModal, _React$Component);

        function LoginModal(props) {
          _classCallCheck(this, LoginModal);

          var _this = _possibleConstructorReturn(this, (LoginModal.__proto__ || Object.getPrototypeOf(LoginModal)).call(this, props));

          _this.state = {
            username: '',
            password: '',
            valid: false
          };
          return _this;
        }

        _createClass(LoginModal, [{
          key: 'usernameChange',
          value: function usernameChange(evt) {
            var valid = false;
            if (this.state.password && evt.target.value) valid = true;
            this.setState({ username: evt.target.value, valid: valid });
          }
        }, {
          key: 'passwordChange',
          value: function passwordChange(evt) {
            var valid = false;
            if (this.state.username && evt.target.value) valid = true;
            this.setState({ password: evt.target.value, valid: valid });
          }
        }, {
          key: 'stopPropagation',
          value: function stopPropagation(evt) {
            evt.stopPropagation();
          }
        }, {
          key: 'submit',
          value: function submit(evt) {
            evt.preventDefault();
            console.log(this.state);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              'div',
              { className: 'modal login-modal', onClick: function onClick() {
                  return _this2.props.setUser();
                } },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'form',
                  { onClick: this.stopPropagation },
                  React.createElement(
                    'label',
                    null,
                    this.props.tr('username'),
                    React.createElement('input', { type: 'text', value: this.state.username, onChange: this.usernameChange.bind(this) })
                  ),
                  React.createElement(
                    'label',
                    null,
                    this.props.tr('password'),
                    React.createElement('input', { type: 'password', value: this.state.password, onChange: this.passwordChange.bind(this) })
                  ),
                  React.createElement(
                    'button',
                    {
                      disabled: this.state.valid ? false : 'disabled',
                      type: 'button',
                      onClick: this.submit.bind(this)
                    },
                    this.props.tr('login')
                  )
                )
              )
            );
          }
        }]);

        return LoginModal;
      }(React.Component);

      _export('default', LoginModal);
    }
  };
});