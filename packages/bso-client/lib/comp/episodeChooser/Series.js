'use strict';

System.register('bso-client/comp/episodeChooser/Series', ['react', './Episode', '../Swipe'], function (_export, _context) {
  "use strict";

  var React, Episode, Swipe, _createClass, Series;

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
    }, function (_Episode) {
      Episode = _Episode.default;
    }, function (_Swipe) {
      Swipe = _Swipe.default;
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

      Series = function (_React$Component) {
        _inherits(Series, _React$Component);

        function Series(props) {
          _classCallCheck(this, Series);

          var _this = _possibleConstructorReturn(this, (Series.__proto__ || Object.getPrototypeOf(Series)).call(this, props));

          _this.state = {
            scrollPos: 0,
            selectedEpisode: props.selectedEpisode
          };
          return _this;
        }

        _createClass(Series, [{
          key: 'scrollLeft',
          value: function scrollLeft() {
            if (this.state.scrollPos === -(this.props.episodes.length - 2) * 40) return;
            this.setState({ scrollPos: this.state.scrollPos - 80 });
          }
        }, {
          key: 'scrollRight',
          value: function scrollRight() {
            if (this.state.scrollPos === 0) return;
            this.setState({ scrollPos: this.state.scrollPos + 80 });
          }
        }, {
          key: 'select',
          value: function select(episodeNum) {
            this.props.select(this.props.series, episodeNum);
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedEpisode !== false) this.setState({ selectedEpisode: nextProps.selectedEpisode });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            return React.createElement(
              'div',
              { className: 'series' },
              React.createElement(
                'div',
                { className: 'info' },
                React.createElement(
                  'div',
                  { className: 'font2' },
                  this.props.title
                ),
                React.createElement(
                  'div',
                  { className: 'font3' },
                  this.props.summary
                )
              ),
              React.createElement(
                'div',
                { className: 'series-scroll' },
                React.createElement(
                  'div',
                  { className: 'scroll-right', onClick: this.scrollRight.bind(this) },
                  React.createElement('img', { src: 'img/left.png' })
                ),
                React.createElement(
                  Swipe,
                  {
                    className: 'episode-swipe',
                    onSwipeLeft: this.scrollLeft.bind(this),
                    onSwipeRight: this.scrollRight.bind(this)
                  },
                  React.createElement(
                    'div',
                    {
                      className: 'episode-list',
                      style: { left: this.state.scrollPos + 'vw' }
                    },
                    this.props.episodes.map(function (episode, key) {
                      return React.createElement(Episode, {
                        key: key,
                        title: episode.title,
                        summary: episode.summary,
                        img: episode.img,
                        series: _this2.props.series,
                        episodeNum: key,
                        select: _this2.select.bind(_this2),
                        selected: _this2.props.selectedEpisode === key
                      });
                    })
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'scroll-left', onClick: this.scrollLeft.bind(this) },
                  React.createElement('img', { src: 'img/right.png' })
                )
              ),
              React.createElement(
                'div',
                { className: 'episode-detail' + (this.props.selectedEpisode !== false ? ' open' : '') },
                this.state.selectedEpisode !== false && React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'div',
                    {
                      className: 'detail-img',
                      style: { backgroundImage: "url('" + this.props.episodes[this.state.selectedEpisode].img + "')" }
                    },
                    React.createElement(
                      'div',
                      { className: 'overlay' },
                      React.createElement(
                        'div',
                        { className: 'top' },
                        React.createElement(
                          'div',
                          { className: 'title font2' },
                          "S" + (this.props.series + 1) + ":E" + (this.state.selectedEpisode + 1) + " " + this.props.episodes[this.state.selectedEpisode].title
                        ),
                        React.createElement(
                          'div',
                          { className: 'close font2' },
                          React.createElement(
                            'div',
                            { onClick: this.props.deselect },
                            '\u2716'
                          )
                        )
                      ),
                      React.createElement(
                        'div',
                        { className: 'play', onClick: this.props.play },
                        React.createElement(
                          'div',
                          null,
                          React.createElement(
                            'span',
                            null,
                            '\u25B6'
                          )
                        )
                      ),
                      React.createElement('div', null)
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'detail-summary' },
                    React.createElement(
                      'div',
                      { className: 'font3' },
                      this.props.episodes[this.state.selectedEpisode].summary
                    )
                  )
                )
              )
            );
          }
        }]);

        return Series;
      }(React.Component);

      _export('default', Series);
    }
  };
});