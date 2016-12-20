'use strict';

System.register('bso-client/comp/player/Player', ['react', './slides/Text', './slides/Slider'], function (_export, _context) {
  "use strict";

  var React, Text, Slider, _createClass, Player;

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
    }, function (_slidesText) {
      Text = _slidesText.default;
    }, function (_slidesSlider) {
      Slider = _slidesSlider.default;
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

      Player = function (_React$Component) {
        _inherits(Player, _React$Component);

        function Player(props) {
          _classCallCheck(this, Player);

          var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

          _this.state = {
            slide: 0
          };

          _this.episode = _this.props.store.episode.find(_this.props.episode);
          return _this;
        }

        _createClass(Player, [{
          key: 'next',
          value: function next() {
            this.setState({ slide: this.state.slide + 1 });
          }
        }, {
          key: 'previous',
          value: function previous() {
            this.setState({ slide: this.state.slide - 1 });
          }
        }, {
          key: 'audio',
          value: function audio() {
            console.log('Play audio');
          }
        }, {
          key: 'render',
          value: function render() {
            var type = void 0;
            var slide = void 0;

            return React.createElement(
              'div',
              { className: 'player' },
              this.episode.slides.map(function (slideObj, key) {
                if (slideObj.text) type = 'text';else if (slideObj.slider) type = 'slider';else if (slideObj.listen) type = 'listen';else if (slideObj.pick) type = 'pick';else if (slideObj.multipick) type = 'multipick';

                slide = slideObj[type];

                if (type === 'text') {
                  return React.createElement(Text, {
                    key: key,
                    text: slide.text,
                    audio: slide.audio
                  });
                } else if (type === 'slider') {
                  return React.createElement(Slider, {
                    key: key,
                    question: slide.question,
                    answers: slide.answers,
                    feedback: slide.feedback
                  });
                }
              }),
              React.createElement(
                'div',
                { className: 'nav' },
                React.createElement(
                  'div',
                  { className: 'previous btn ' + (this.state.slide !== 0 ? '' : 'hide'), onClick: this.previous.bind(this) },
                  React.createElement(
                    'div',
                    null,
                    React.createElement('div', null)
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'audio btn ' + (type === 'text' && slide.audio ? '' : 'hide'), onClick: this.audio.bind(this) },
                  React.createElement(
                    'div',
                    null,
                    React.createElement('div', null)
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'next btn ' + (this.state.slide !== this.episode.slides.length - 1 ? '' : 'hide'), onClick: this.next.bind(this) },
                  React.createElement(
                    'div',
                    null,
                    React.createElement('div', null)
                  )
                )
              )
            );
          }
        }]);

        return Player;
      }(React.Component);

      _export('default', Player);
    }
  };
});