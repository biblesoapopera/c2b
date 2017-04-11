'use strict';

System.register('bso-client/comp/player/Feedback', ['react', '../blankSquare'], function (_export, _context) {
  "use strict";

  var React, blankSquare, _createClass, Feedback;

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
    }, function (_blankSquare) {
      blankSquare = _blankSquare.default;
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

      Feedback = function (_React$Component) {
        _inherits(Feedback, _React$Component);

        function Feedback() {
          _classCallCheck(this, Feedback);

          return _possibleConstructorReturn(this, (Feedback.__proto__ || Object.getPrototypeOf(Feedback)).apply(this, arguments));
        }

        _createClass(Feedback, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              'div',
              { className: 'feedback' },
              React.createElement('div', { className: 'arrow' }),
              React.createElement(
                'div',
                { className: 'box' },
                React.createElement(
                  'div',
                  { className: 'text' },
                  this.props.text.map(function (text, index) {
                    return React.createElement(
                      'p',
                      { key: index },
                      text
                    );
                  })
                ),
                React.createElement(
                  'div',
                  { className: 'actions' },
                  this.props.showReset && React.createElement(
                    'div',
                    { className: 'reset', onClick: this.props.reset },
                    React.createElement('img', { src: blankSquare })
                  ),
                  this.props.showNext && React.createElement(
                    'div',
                    { className: 'next', onClick: this.props.next },
                    React.createElement('img', { src: blankSquare })
                  )
                )
              )
            );
          }
        }]);

        return Feedback;
      }(React.Component);

      _export('default', Feedback);
    }
  };
});