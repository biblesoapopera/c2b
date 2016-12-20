"use strict";

System.register("bso-server/cleanRevokedTokens", [], function (_export, _context) {
  "use strict";

  var clean;
  return {
    setters: [],
    execute: function () {
      clean = function clean(db) {
        db.revokedToken.clean();
        setTimeout(clean, 1000 * 60 * 60 * 24);
      };

      _export("default", function (db) {
        clean(db);
      });
    }
  };
});