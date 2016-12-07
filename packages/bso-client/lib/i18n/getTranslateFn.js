'use strict';

System.register('bso-client/i18n/getTranslateFn', ['./store'], function (_export, _context) {
  "use strict";

  var store;
  return {
    setters: [function (_store) {
      store = _store.default;
    }],
    execute: function () {
      _export('default', function (locale, context) {
        return function (str) {
          if (!store[locale].loaded || !store[locale][context] || typeof store[locale][context][str] !== 'string') return str;
          return store[locale][context][str];
        };
      });
    }
  };
});