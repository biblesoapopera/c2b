'use strict';

System.register('bso-client', ['regenerator', 'react', 'react-dom', './comp/App', './api', './xhr', './jwt', 'spark-md5', './cache'], function (_export, _context) {
  "use strict";

  var React, ReactDOM, App, apiFn, xhrFn, jwtFn, SparkMD5, cacheFn, jwt, xhr, api;
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
    }, function (_sparkMd) {
      SparkMD5 = _sparkMd.default;
    }, function (_cache) {
      cacheFn = _cache.default;
    }],
    execute: function () {
      jwt = jwtFn(localStorage);
      xhr = xhrFn(jwt, XMLHttpRequest);
      api = apiFn(xhr, jwt, SparkMD5, FileReader, cacheFn);


      ReactDOM.render(React.createElement(App, { api: api }), document.getElementById('root'));
    }
  };
});