'use strict';

System.register('bso-client/comp/player/slides/Pick', ['react'], function (_export, _context) {
  "use strict";

  var React, _createClass, Pick;

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

      Pick = function (_React$Component) {
        _inherits(Pick, _React$Component);

        function Pick(props) {
          _classCallCheck(this, Pick);

          var _this = _possibleConstructorReturn(this, (Pick.__proto__ || Object.getPrototypeOf(Pick)).call(this, props));

          _this.state = {
            complete: props.complete === 'always',
            score: 0,
            value: '',
            activeKey: false
          };
          return _this;
        }

        _createClass(Pick, [{
          key: 'click',
          value: function click(key, value, score) {
            this.setState({
              score: score,
              value: value,
              activeKey: key
            });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              'div',
              { className: 'slide pick' },
              React.createElement(
                'div',
                { className: 'pick-outter' },
                React.createElement('div', { className: 'question', dangerouslySetInnerHTML: { __html: this.props.question } }),
                React.createElement(
                  'div',
                  { className: 'answers' },
                  this.props.answers.map(function (answer, key) {
                    return React.createElement(
                      'div',
                      {
                        className: 'btn' + (_this2.state.activeKey === key ? ' active' : ''),
                        key: key,
                        onClick: _this2.click.bind(_this2, key, answer.value, answer.score)
                      },
                      React.createElement('div', { className: 'tick' }),
                      React.createElement(
                        'div',
                        { className: 'text' },
                        answer.value
                      )
                    );
                  })
                )
              )
            );
          }
        }]);

        return Pick;
      }(React.Component);

      _export('default', Pick);
    }
  };
});