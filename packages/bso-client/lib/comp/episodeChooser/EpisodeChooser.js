'use strict';

System.register('bso-client/comp/episodeChooser/EpisodeChooser', ['react', './Series', '../Loading', '../Error', '../modal/LangSwitcherModal'], function (_export, _context) {
  "use strict";

  var React, Series, Loading, Error, LangSwitcherModal, _createClass, EpisodeChooser;

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
    }, function (_Series) {
      Series = _Series.default;
    }, function (_Loading) {
      Loading = _Loading.default;
    }, function (_Error) {
      Error = _Error.default;
    }, function (_modalLangSwitcherModal) {
      LangSwitcherModal = _modalLangSwitcherModal.default;
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

      EpisodeChooser = function (_React$Component) {
        _inherits(EpisodeChooser, _React$Component);

        function EpisodeChooser(props) {
          _classCallCheck(this, EpisodeChooser);

          var _this = _possibleConstructorReturn(this, (EpisodeChooser.__proto__ || Object.getPrototypeOf(EpisodeChooser)).call(this, props));

          _this.state = {
            selectedEpisode: false,
            seriesData: false,
            lang: _this.props.lang,
            err: false,
            switchLangVisible: false
          };
          return _this;
        }

        _createClass(EpisodeChooser, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.props.api.menu(['lang', 'hamburger']);
          }
        }, {
          key: 'componentDidMount',
          value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var res;
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.props.api.series.readLangPublished(this.props.lang);

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
          key: 'select',
          value: function select(seriesNum, episodeNum) {
            this.setState({
              selectedEpisode: { series: seriesNum, episode: episodeNum }
            });
          }
        }, {
          key: 'deselect',
          value: function deselect() {
            this.setState({ selectedEpisode: false });
          }
        }, {
          key: 'play',
          value: function play() {
            this.props.api.go(['choose-delivery', this.state.seriesData[this.state.selectedEpisode.series].episodes[this.state.selectedEpisode.episode].id]);
          }
        }, {
          key: 'showSwitchLang',
          value: function showSwitchLang() {
            this.setState({ switchLangVisible: true });
          }
        }, {
          key: 'newLang',
          value: function newLang(lang) {
            this.setState({ switchLangVisible: false });
            if (lang !== this.props.lang) this.props.api.lang.switch(lang);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            var seriesList = this.props.api.series.readLangPublished(this.props.lang);

            var seriesData = this.state.seriesData;

            if (!seriesData && !this.state.err) {
              return React.createElement(Loading, null);
            }

            if (this.state.err) {
              return React.createElement(Error, { err: this.state.err });
            }

            if (seriesData) {
              return React.createElement(
                'div',
                { className: 'episode-chooser' },
                !!seriesData.length && React.createElement(
                  'div',
                  { className: 'series-list' },
                  seriesData.map(function (series, key) {
                    return React.createElement(Series, {
                      key: key,
                      title: series.title,
                      summary: series.summary,
                      episodes: series.episodes,
                      series: key,
                      selectedEpisode: _this2.state.selectedEpisode.series === key ? _this2.state.selectedEpisode.episode : false,
                      select: _this2.select.bind(_this2),
                      deselect: _this2.deselect.bind(_this2),
                      play: _this2.play.bind(_this2)
                    });
                  })
                ),
                !seriesData.length && React.createElement(
                  'div',
                  { className: 'font3 empty' },
                  this.props.api.translate('episode-chooser', 'No episodes available in selected language')
                ),
                React.createElement(
                  'div',
                  { className: 'other-languages btn font2', onClick: this.showSwitchLang.bind(this) },
                  this.props.api.translate('episode-chooser', 'other languages')
                ),
                this.state.switchLangVisible && React.createElement(LangSwitcherModal, {
                  api: this.props.api,
                  lang: this.props.lang,
                  newLang: this.newLang.bind(this)
                })
              );
            }
          }
        }]);

        return EpisodeChooser;
      }(React.Component);

      _export('default', EpisodeChooser);
    }
  };
});