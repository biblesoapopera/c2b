'use strict';

System.register('bso-client/comp/EpisodeChooser', ['react', './Series', './LangSwitcherDropdown'], function (_export, _context) {
  "use strict";

  var React, Series, LangSwitcherDropdown, _createClass, EpisodeChooser;

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
    }, function (_LangSwitcherDropdown) {
      LangSwitcherDropdown = _LangSwitcherDropdown.default;
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
            showLang: false
          };
          return _this;
        }

        _createClass(EpisodeChooser, [{
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
            this.props.go(['choose-delivery', this.props.store.series.find(this.props.lang)[this.state.selectedEpisode.series].episodes[this.state.selectedEpisode.episode].id]);
          }
        }, {
          key: 'tr',
          value: function tr(str) {
            return this.props.tr('episode-chooser', str);
          }
        }, {
          key: 'showLang',
          value: function showLang() {
            this.setState({ showLang: true });
          }
        }, {
          key: 'newLang',
          value: function newLang(lang) {
            this.setState({ showLang: false });
            if (lang !== this.props.lang) this.props.switchLang(lang);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            var seriesList = this.props.store.series.find(this.props.lang);
            return React.createElement(
              'div',
              { className: 'episode-chooser' },
              !!seriesList.length && React.createElement(
                'div',
                { className: 'series-list' },
                seriesList.map(function (series, key) {
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
              !seriesList.length && React.createElement(
                'div',
                { className: 'font3 empty' },
                this.tr('No episodes available in selected language')
              ),
              React.createElement(
                'div',
                { className: 'other-languages btn font2', onClick: this.showLang.bind(this) },
                this.tr('other languages')
              ),
              this.state.showLang && React.createElement(LangSwitcherDropdown, {
                store: this.props.store,
                lang: this.props.lang,
                newLang: this.newLang.bind(this)
              })
            );
          }
        }]);

        return EpisodeChooser;
      }(React.Component);

      _export('default', EpisodeChooser);
    }
  };
});