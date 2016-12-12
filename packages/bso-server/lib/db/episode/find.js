'use strict';

System.register('bso-server/db/episode/find', ['bso-model/Episode'], function (_export, _context) {
  "use strict";

  var Episode;
  return {
    setters: [function (_bsoModelEpisode) {
      Episode = _bsoModelEpisode.default;
    }],
    execute: function () {
      _export('default', function (id) {
        return Episode.findOne({ id: id }).exec();
      });
    }
  };
});