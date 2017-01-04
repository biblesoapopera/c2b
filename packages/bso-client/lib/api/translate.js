'use strict';

System.register('bso-client/api/translate', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (getStringPack) {
        return function (lang, context, str) {
          var strPack = getStringPack(lang);

          if (lang !== 'en' && strPack && (!strPack[context] || typeof strPack[context][str] !== 'string')) {
            // TODO do something better with this warning
            console.log('Missing translation:', lang, context, str);
          }

          if (!strPack || !strPack[context] || typeof strPack[context][str] !== 'string') {
            return str;
          }

          return strPack[context][str];
        };
      });
    }
  };
});