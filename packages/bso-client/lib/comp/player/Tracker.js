"use strict";

System.register("bso-client/comp/player/Tracker", ["react"], function (_export, _context) {
  "use strict";

  var React, _createClass, Tracker;

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

      Tracker = function (_React$Component) {
        _inherits(Tracker, _React$Component);

        function Tracker() {
          _classCallCheck(this, Tracker);

          return _possibleConstructorReturn(this, (Tracker.__proto__ || Object.getPrototypeOf(Tracker)).apply(this, arguments));
        }

        _createClass(Tracker, [{
          key: "render",
          value: function render() {
            return React.createElement(
              "div",
              { className: "slide-tracker" },
              this.props.current,
              "/",
              this.props.total
            );
          }
        }]);

        return Tracker;
      }(React.Component);

      _export("default", Tracker);
    }
  };
});