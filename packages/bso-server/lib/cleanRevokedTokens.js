"use strict";

System.register("bso-server/cleanRevokedTokens", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function (db) {
        var clean = function clean() {
          db.revokedToken.clean();
          setTimeout(clean, 1000 * 60 * 60 * 24);
        };

        clean();
      });
    }
  };
});