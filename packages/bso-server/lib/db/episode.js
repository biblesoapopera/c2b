'use strict';

System.register('bso-server/db/episode', ['bso-model/Episode', 'mongoose'], function (_export, _context) {
  "use strict";

  var mongoose;
  return {
    setters: [function (_bsoModelEpisode) {}, function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      _export('default', {
        find: function find(id) {
          return mongoose.model('Episode').findOne({ id: id }).exec();
        }
      });
    }
  };
});