'use strict';

System.register('bso-client', ['react', 'react-dom', './comp/App', './api', './xhr', './jwt'], function (_export, _context) {
  "use strict";

  var React, ReactDOM, App, api, xhr, jwt;
  return {
    setters: [function (_react) {
      React = _react.default;
    }, function (_reactDom) {
      ReactDOM = _reactDom.default;
    }, function (_compApp) {
      App = _compApp.default;
    }, function (_api) {
      api = _api.default;
    }, function (_xhr) {
      xhr = _xhr.default;
    }, function (_jwt) {
      jwt = _jwt.default;
    }],
    execute: function () {

      ReactDOM.render(React.createElement(App, { api: api(xhr(jwt)) }), document.getElementById('root'));
    }
  };
});