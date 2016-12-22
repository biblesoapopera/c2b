"use strict";

System.register("bso-client/xhr/post", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function (jwt, XMLHttpRequest) {
        return function (url, data) {
          return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            var token = jwt.get();
            if (jwt) xhr.setRequestHeader('authorization', 'jwt ' + token);

            xhr.onreadystatechange = function () {
              if (xhr.readyState !== 4) return;

              if (xhr.status == 200) {
                var authHeader = xhr.getResponseHeader('authorization');
                if (authHeader && authHeader.slice(0, 3) === 'jwt') {
                  jwt.set(authHeader.slice(4));
                }
              }

              resolve({
                status: xhr.status,
                body: JSON.parse(xhr.responseText)
              });
            };
            xhr.send(JSON.stringify(data));
          });
        };
      });
    }
  };
});