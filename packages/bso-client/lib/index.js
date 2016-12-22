'use strict';

System.register('bso-client', ['regenerator', 'react', 'react-dom', './comp/App', './api', './xhr', './jwt'], function (_export, _context) {
  "use strict";

  var React, ReactDOM, App, apiFn, xhrFn, jwtFn, jwt, xhr, api;
  return {
    setters: [function (_regenerator) {}, function (_react) {
      React = _react.default;
    }, function (_reactDom) {
      ReactDOM = _reactDom.default;
    }, function (_compApp) {
      App = _compApp.default;
    }, function (_api) {
      apiFn = _api.default;
    }, function (_xhr) {
      xhrFn = _xhr.default;
    }, function (_jwt) {
      jwtFn = _jwt.default;
    }],
    execute: function () {
      jwt = jwtFn(localStorage);
      xhr = xhrFn(jwt, XMLHttpRequest);
      api = apiFn(xhr);


      ReactDOM.render(React.createElement(App, { api: api }), document.getElementById('root'));
    }
  };
});