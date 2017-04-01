'use strict';

System.register('bso-client/comp/player/slides/Multipick', ['react'], function (_export, _context) {
  "use strict";

  var React, _createClass, Multipick;

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

      Multipick = function (_React$Component) {
        _inherits(Multipick, _React$Component);

        function Multipick(props) {
          _classCallCheck(this, Multipick);

          var _this = _possibleConstructorReturn(this, (Multipick.__proto__ || Object.getPrototypeOf(Multipick)).call(this, props));

          _this.state = {
            complete: props.complete === 'always',
            score: 0,
            values: [],
            activeKeys: []
          };
          return _this;
        }

        _createClass(Multipick, [{
          key: 'click',
          value: function click(key, value, score) {
            var newActiveKeys = this.state.activeKeys.slice(0);

            if (!this.state.activeKeys.some(function (k, index) {
              if (k.index !== key) return;
              newActiveKeys.splice(index, 1);
              return true;
            })) {
              newActiveKeys.push({ index: key, value: value, score: score });
            }

            this.setState({
              score: newActiveKeys.reduce(function (score, k) {
                return score + k.score;
              }, 0),
              values: newActiveKeys.map(function (k) {
                return k.value;
              }),
              activeKeys: newActiveKeys
            });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              'div',
              { className: 'slide multipick' },
              React.createElement(
                'div',
                { className: 'multipick-outter' },
                React.createElement('div', { className: 'question', dangerouslySetInnerHTML: { __html: this.props.question } }),
                React.createElement(
                  'div',
                  { className: 'answers' },
                  this.props.answers.map(function (answer, key) {
                    return React.createElement(
                      'div',
                      {
                        className: 'btn' + (_this2.state.activeKeys.some(function (k) {
                          return k.index === key;
                        }) ? ' active' : ''),
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

        return Multipick;
      }(React.Component);

      _export('default', Multipick);
    }
  };
});