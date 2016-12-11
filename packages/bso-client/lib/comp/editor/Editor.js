'use strict';

System.register('bso-client/comp/editor/Editor', ['react'], function (_export, _context) {
  "use strict";

  var React, _createClass, Editor;

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

      Editor = function (_React$Component) {
        _inherits(Editor, _React$Component);

        function Editor() {
          _classCallCheck(this, Editor);

          return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
        }

        _createClass(Editor, [{
          key: 'editAudio',
          value: function editAudio() {
            this.props.go(['audio-editor']);
          }
        }, {
          key: 'editSeries',
          value: function editSeries() {
            this.props.go(['series-editor']);
          }
        }, {
          key: 'editEpisode',
          value: function editEpisode() {
            this.props.go(['episode-editor']);
          }
        }, {
          key: 'tr',
          value: function tr(str) {
            return this.props.tr('editor', str);
          }
        }, {
          key: 'render',
          value: function render() {
            return React.createElement(
              'div',
              { className: 'editor' },
              React.createElement(
                'div',
                { className: 'text font1' },
                this.tr('What would you like to edit?')
              ),
              React.createElement(
                'div',
                { className: 'btn font2', onClick: this.editAudio.bind(this) },
                this.tr('Audio Library')
              ),
              React.createElement(
                'div',
                { className: 'btn font2', onClick: this.editSeries.bind(this) },
                this.tr('Series')
              ),
              React.createElement(
                'div',
                { className: 'btn font2', onClick: this.editEpisode.bind(this) },
                this.tr('Episode')
              )
            );
          }
        }]);

        return Editor;
      }(React.Component);

      _export('default', Editor);
    }
  };
});