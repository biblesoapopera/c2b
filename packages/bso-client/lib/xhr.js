'use strict';

System.register('bso-client/xhr', ['./xhr/get', './xhr/post'], function (_export, _context) {
  "use strict";

  var get, post;
  return {
    setters: [function (_xhrGet) {
      get = _xhrGet.default;
    }, function (_xhrPost) {
      post = _xhrPost.default;
    }],
    execute: function () {
      _export('default', function (jwt, XMLHttpRequest) {
        return {
          get: get(jwt, XMLHttpRequest),
          post: post(jwt, XMLHttpRequest)
        };
      });
    }
  };
});