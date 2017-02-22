'use strict';

System.register('bso-client/comp/editor/CreateSeries', ['react', './CreateSeriesModal'], function (_export, _context) {
  "use strict";

  var React, CreateSeriesModal, _createClass, CreateSeries;

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
    }, function (_CreateSeriesModal) {
      CreateSeriesModal = _CreateSeriesModal.default;
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

      CreateSeries = function (_React$Component) {
        _inherits(CreateSeries, _React$Component);

        function CreateSeries(props) {
          _classCallCheck(this, CreateSeries);

          var _this = _possibleConstructorReturn(this, (CreateSeries.__proto__ || Object.getPrototypeOf(CreateSeries)).call(this, props));

          _this.state = {
            visible: false
          };
          return _this;
        }

        _createClass(CreateSeries, [{
          key: 'show',
          value: function show() {
            this.setState({ visible: true });
          }
        }, {
          key: 'hide',
          value: function hide() {
            this.setState({ visible: false });
          }
        }, {
          key: 'render',
          value: function render() {
            return React.createElement(
              'div',
              { className: 'create-series' },
              React.createElement(
                'div',
                { className: 'inner', onClick: this.show.bind(this) },
                React.createElement(
                  'div',
                  { className: 'icon' },
                  React.createElement('div', null)
                )
              ),
              this.state.visible && React.createElement(CreateSeriesModal, {
                api: this.props.api,
                hide: this.hide.bind(this),
                lang: this.props.lang,
                order: this.props.order,
                createdSeries: this.props.createdSeries
              })
            );
          }
        }]);

        return CreateSeries;
      }(React.Component);

      _export('default', CreateSeries);
    }
  };
});