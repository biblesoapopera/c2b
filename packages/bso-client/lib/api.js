'use strict';

System.register('bso-client/api', ['./api/user', './api/lang', './api/translate', './api/audio', './api/episode'], function (_export, _context) {
  "use strict";

  var userFn, langFn, translateFn, audioFn, episodeFn;
  return {
    setters: [function (_apiUser) {
      userFn = _apiUser.default;
    }, function (_apiLang) {
      langFn = _apiLang.default;
    }, function (_apiTranslate) {
      translateFn = _apiTranslate.default;
    }, function (_apiAudio) {
      audioFn = _apiAudio.default;
    }, function (_apiEpisode) {
      episodeFn = _apiEpisode.default;
    }],
    execute: function () {
      _export('default', function (xhr, jwt, SparkMD5, FileReader) {
        var user = userFn(xhr, jwt);
        var lang = langFn(xhr);

        return {
          user: user,
          lang: lang,
          translate: translateFn(lang.readSync),
          audio: audioFn(xhr, SparkMD5, FileReader),
          episode: episodeFn(xhr)
        };
      });
    }
  };
});