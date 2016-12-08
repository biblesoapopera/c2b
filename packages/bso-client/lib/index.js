'use strict';

System.register('bso-client', ['regenerator', 'react', 'react-dom', './comp/App'], function (_export, _context) {
  "use strict";

  var regenerator, React, ReactDOM, App;
  return {
    setters: [function (_regenerator) {
      regenerator = _regenerator.default;
    }, function (_react) {
      React = _react.default;
    }, function (_reactDom) {
      ReactDOM = _reactDom.default;
    }, function (_compApp) {
      App = _compApp.default;
    }],
    execute: function () {

      ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
    }
  };
});