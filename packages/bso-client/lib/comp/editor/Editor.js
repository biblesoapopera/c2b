'use strict';

System.register('bso-client/comp/editor/Editor', ['react', './CreateSeriesModal', '../Loading', '../Error'], function (_export, _context) {
  "use strict";

  var React, CreateSeriesModal, Loading, Error, _createClass, Editor;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

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
    }, function (_Loading) {
      Loading = _Loading.default;
    }, function (_Error) {
      Error = _Error.default;
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

        function Editor(props) {
          _classCallCheck(this, Editor);

          var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

          _this.state = {
            create: false,
            seriesData: false,
            err: false
          };
          return _this;
        }

        _createClass(Editor, [{
          key: 'componentDidMount',
          value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var res;
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.props.api.series.readLangAll(this.props.lang);

                    case 2:
                      res = _context2.sent;

                      if (res.status === 200) {
                        this.setState({ seriesData: res.body });
                      } else {
                        this.setState({ err: res });
                      }

                    case 4:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, this);
            }));

            function componentDidMount() {
              return _ref.apply(this, arguments);
            }

            return componentDidMount;
          }()
        }, {
          key: 'create',
          value: function create() {
            this.setState({ create: true });
          }
        }, {
          key: 'created',
          value: function created() {
            this.setState({ create: false });
          }
        }, {
          key: 'render',
          value: function render() {
            var seriesData = this.state.seriesData;

            if (!seriesData && !this.state.err) {
              return React.createElement(Loading, null);
            }

            if (this.state.err) {
              console.log(this.state.err);
              return React.createElement(Error, { err: this.state.err });
            }

            if (seriesData) {
              return React.createElement(
                'div',
                { className: 'editor' },
                React.createElement(
                  'div',
                  { className: 'font1' },
                  React.createElement(
                    'span',
                    null,
                    this.props.api.translate('editor', 'edit series in') + ' '
                  ),
                  React.createElement(
                    'span',
                    null,
                    this.props.api.lang.getName(this.props.lang)
                  )
                ),
                React.createElement('div', { onClick: this.create.bind(this), className: 'create' }),
                this.state.create && React.createElement(CreateSeriesModal, {
                  api: this.props.api,
                  lang: this.props.lang,
                  created: this.created.bind(this),
                  order: seriesData.length
                })
              );
            }
          }
        }]);

        return Editor;
      }(React.Component);

      _export('default', Editor);
    }
  };
});