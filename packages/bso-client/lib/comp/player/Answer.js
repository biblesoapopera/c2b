'use strict';

System.register('bso-client/comp/player/Answer', ['react', './Feedback'], function (_export, _context) {
  "use strict";

  var React, Feedback, _createClass, Answer;

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
    }, function (_Feedback) {
      Feedback = _Feedback.default;
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

      Answer = function (_React$Component) {
        _inherits(Answer, _React$Component);

        function Answer() {
          _classCallCheck(this, Answer);

          return _possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).apply(this, arguments));
        }

        _createClass(Answer, [{
          key: 'click',
          value: function click() {
            return this.props.click(this.props.value, this.props.score);
          }
        }, {
          key: 'render',
          value: function render() {
            return React.createElement(
              'div',
              { className: 'answer' },
              React.createElement(
                'div',
                {
                  className: 'btn' + (this.props.active ? ' active' : ''),
                  onClick: this.click.bind(this)
                },
                React.createElement('div', { className: 'tick' }),
                React.createElement(
                  'div',
                  { className: 'text' },
                  this.props.value
                )
              ),
              React.createElement(Feedback, {
                text: this.props.feedback,
                showReset: this.props.showFeedbackReset,
                showNext: this.props.showFeedbackNext,
                reset: this.props.reset,
                next: this.props.next
              })
            );
          }
        }]);

        return Answer;
      }(React.Component);

      _export('default', Answer);
    }
  };
});