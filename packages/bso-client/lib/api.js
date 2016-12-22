'use strict';

System.register('bso-client/api', ['./api/user', './api/lang', './api/translate'], function (_export, _context) {
  "use strict";

  var userFn, langFn, translateFn;
  return {
    setters: [function (_apiUser) {
      userFn = _apiUser.default;
    }, function (_apiLang) {
      langFn = _apiLang.default;
    }, function (_apiTranslate) {
      translateFn = _apiTranslate.default;
    }],
    execute: function () {
      _export('default', function (xhr, jwt) {
        var user = userFn(xhr, jwt);
        var lang = langFn(xhr);

        return {
          user: user,
          lang: lang,
          translate: translateFn(lang.readSync)
        };
      });
    }
  };
});