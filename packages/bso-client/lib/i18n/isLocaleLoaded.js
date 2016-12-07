'use strict';

System.register('bso-client/i18n/isLocaleLoaded', ['./store'], function (_export, _context) {
  "use strict";

  var store;
  return {
    setters: [function (_store) {
      store = _store.default;
    }],
    execute: function () {
      _export('default', function (locale) {
        return store[locale].loaded;
      });
    }
  };
});