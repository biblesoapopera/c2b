'use strict';

System.register('bso-client/comp/menu/Menu', ['react', './LangSwitcher'], function (_export, _context) {
  "use strict";

  var React, LangSwitcher, _createClass, Menu;

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
    }, function (_LangSwitcher) {
      LangSwitcher = _LangSwitcher.default;
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

      Menu = function (_React$Component) {
        _inherits(Menu, _React$Component);

        function Menu() {
          _classCallCheck(this, Menu);

          return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
        }

        _createClass(Menu, [{
          key: 'render',
          value: function render() {
            var items = this.props.buttons.map(function (btn) {
              if (btn.name === 'lang') {
                return React.createElement(LangSwitcher, {
                  key: btn.name,
                  lang: btn.lang,
                  switchLang: btn.fn,
                  store: btn.store
                });
              } else if (btn.name === 'login') {
                return React.createElement(
                  'div',
                  { key: btn.name },
                  'login'
                );
              }
            });

            return React.createElement(
              'div',
              { className: 'menu' },
              React.createElement(
                'div',
                { className: 'logo font-logo' },
                'C2B'
              ),
              React.createElement(
                'div',
                { className: 'items' },
                items
              )
            );
            /*
                let items = []
            
                if (this.props.route[0] === 'splash') items = ['lang', 'login']
                if (this.props.route[0] === 'choose-episode') items = ['edit', 'lang']
                if (this.props.route[0] === 'choose-delivery') items = ['lang']
                if (this.props.route[0] === 'player') items = ['lang']
                if (this.props.route[0] === 'editor') items = ['edit-audio', 'edit-series', 'edit-episode']
                if (this.props.route[0] === 'audio-editor') items = ['edit', 'edit-series', 'edit-episode']
            
                return (
                  <div className="menu">
                    <div className="logo font-logo">C2B</div>
            
                    <div className='items'>
            
            
                      {items.indexOf('edit') !== -1 &&
                        <div className="item edit" onClick={::this.edit}>
                          <div></div>
                        </div>
                      }
            
                      {items.indexOf('lang') !== -1 &&
                        <LangSwitcher
                          lang={this.props.lang}
                          switchLang={this.props.switchLang}
                          store={this.props.store}
                        />
                      }
            
                      {items.indexOf('edit-audio') !== -1 &&
                        <div className="item edit-audio" onClick={::this.editAudio}>
                          <div></div>
                        </div>
                      }
            
                      {items.indexOf('edit-series') !== -1 &&
                        <div className="item edit-series" onClick={::this.editSeries}>
                          <div></div>
                        </div>
                      }
            
                      {items.indexOf('edit-episode') !== -1 &&
                        <div className="item edit-episode" onClick={::this.editEpisode}>
                          <div></div>
                        </div>
                      }
                    </div>
                  </div>
                )*/
          }
        }]);

        return Menu;
      }(React.Component);

      _export('default', Menu);
    }
  };
});