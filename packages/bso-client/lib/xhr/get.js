'use strict';

System.register('bso-client/xhr/get', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (jwt, XMLHttpRequest) {
        return function (url, responseType, progressCb) {
          return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            var token = jwt.get();
            if (token) xhr.setRequestHeader('authorization', 'jwt ' + token);

            if (progressCb) xhr.onprogress = progressCb;

            if (responseType) xhr.responseType = responseType;else xhr.responseType = 'json';

            xhr.onreadystatechange = function () {
              if (xhr.readyState !== 4) return;

              if (xhr.status == 200) {
                var authHeader = xhr.getResponseHeader('authorization');
                if (authHeader && authHeader.slice(0, 3) === 'jwt') {
                  jwt.set(authHeader.slice(4));
                }
              }

              if (xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
                resolve({
                  status: xhr.status,
                  body: xhr.response
                });
              } else if (xhr.getResponseHeader('Content-Type').indexOf('audio/mpeg') !== -1) {
                resolve({
                  status: xhr.status,
                  body: xhr.response
                });
              } else {
                throw new Error('Unexpected Content-Type ' + xhr.getResponseHeader('Content-Type'));
              }
            };
            xhr.send();
          });
        };
      });
    }
  };
});