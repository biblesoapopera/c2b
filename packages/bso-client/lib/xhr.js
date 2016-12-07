'use strict';

System.register('bso-client/xhr', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (asset) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', asset, true);

          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject('Error fetching asset ' + asset + '. Status: ' + xhr.status);
              }
            }
          };
          xhr.send();
        });
      });
    }
  };
});