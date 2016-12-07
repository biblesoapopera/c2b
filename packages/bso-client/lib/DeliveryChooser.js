'use strict';

System.register('bso-client/DeliveryChooser', ['react', './i18n/getTranslateFn'], function (_export, _context) {
  "use strict";

  var React, getTranslateFn, _createClass, DeliveryChooser;

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

      DeliveryChooser = function (_React$Component) {
        _inherits(DeliveryChooser, _React$Component);

        function DeliveryChooser() {
          _classCallCheck(this, DeliveryChooser);

          return _possibleConstructorReturn(this, (DeliveryChooser.__proto__ || Object.getPrototypeOf(DeliveryChooser)).apply(this, arguments));
        }

        _createClass(DeliveryChooser, [{
          key: 'render',
          value: function render() {
            var tr = getTranslateFn(this.props.locale, 'episode-chooser');

            return React.createElement(
              'div',
              { className: 'delivery-chooser' },
              React.createElement(
                'div',
                { className: 'font2' },
                'How would you like to listen to this episode?'
              ),
              React.createElement(
                'div',
                null,
                this.props.locale,
                ':S',
                this.props.series,
                ':E',
                this.props.episode
              ),
              React.createElement(
                'div',
                { className: 'btn' },
                React.createElement(
                  'div',
                  { className: 'font2' },
                  'Play episode now'
                ),
                React.createElement(
                  'div',
                  { className: 'font3' },
                  'using streaming data'
                )
              ),
              React.createElement(
                'div',
                { className: 'btn' },
                React.createElement(
                  'div',
                  { className: 'font2' },
                  'Play episode now'
                ),
                React.createElement(
                  'div',
                  { className: 'font3' },
                  'using audio file on this device'
                )
              ),
              React.createElement(
                'div',
                { className: 'btn' },
                React.createElement(
                  'div',
                  { className: 'font2' },
                  'Download episode audio'
                ),
                React.createElement(
                  'div',
                  { className: 'font3' },
                  'to listen to offline and share with friends'
                )
              )
            );
          }
        }]);

        return DeliveryChooser;
      }(React.Component);

      _export('default', DeliveryChooser);
    }
  };
});