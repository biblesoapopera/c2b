'use strict';

System.register('bso-client/translate', ['./store/lang'], function (_export, _context) {
  "use strict";

  var store;
  return {
    setters: [function (_storeLang) {
      store = _storeLang.default;
    }],
    execute: function () {
      _export('default', function (lang, context, str) {
        var strPack = store.find(lang);

        if (strPack && strPack[context] && typeof strPack[context][str] !== 'string') {
          console.log(lang, context, str, strPack[context]);
        }

        if (!strPack || !strPack[context] || typeof strPack[context][str] !== 'string') return str;
        return strPack[context][str];
      });
    }
  };
});