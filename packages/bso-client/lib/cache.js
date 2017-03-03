"use strict";

System.register("bso-client/cache", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", function () {
        var cache = {};

        return {
          set: function set(name, data) {
            cache[name] = data;
          },
          get: function get(name) {
            return cache[name];
          },
          has: function has(name) {
            return cache[name] !== void 0;
          },
          remove: function remove(name) {
            delete cache[name];
          }
        };
      });
    }
  };
});