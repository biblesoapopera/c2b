'use strict';

System.register('bso-server/db/episode', ['./episode/find'], function (_export, _context) {
  "use strict";

  var find;
  return {
    setters: [function (_episodeFind) {
      find = _episodeFind.default;
    }],
    execute: function () {
      _export('default', function (url) {
        return {
          find: find(url)
        };
      });
    }
  };
});