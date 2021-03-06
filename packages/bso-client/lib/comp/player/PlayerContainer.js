'use strict';

System.register('bso-client/comp/player/PlayerContainer', ['react', './Player'], function (_export, _context) {
  "use strict";

  var React, Player, _createClass, PlayerContainer;

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
    }, function (_Player) {
      Player = _Player.default;
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

      PlayerContainer = function (_React$Component) {
        _inherits(PlayerContainer, _React$Component);

        function PlayerContainer() {
          _classCallCheck(this, PlayerContainer);

          return _possibleConstructorReturn(this, (PlayerContainer.__proto__ || Object.getPrototypeOf(PlayerContainer)).apply(this, arguments));
        }

        _createClass(PlayerContainer, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              'div',
              { className: 'player-container' },
              React.createElement(Player, {
                api: this.props.api,
                episode: this.props.episode
              })
            );
          }
        }]);

        return PlayerContainer;
      }(React.Component);

      _export('default', PlayerContainer);
    }
  };
});