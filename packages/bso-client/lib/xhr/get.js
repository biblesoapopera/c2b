'use strict';

System.register('bso-client/xhr/get', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (url) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);

          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject('Error fetching url ' + url + '. Status: ' + xhr.status);
              }
            }
          };
          xhr.send();
        });
      });
    }
  };
});