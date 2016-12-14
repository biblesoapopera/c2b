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
        find: function find(criteria) {
          return mongoose.model('Episode').find(criteria).exec();
        },
        findId: function findId(id) {
          return mongoose.model('Episode').findById(id).exec();
        },
        create: function create(episodeObj) {
          var Model = mongoose.model('Episode');
          var model = new Model(episodeObj);
          return model.save();
        },
        update: function update(id, episodeObj) {
          return mongoose.model('Episode').findByIdAndUpdate(id, episodeObj, { runValidators: true }).exec();
        },
        delete: function _delete(id) {
          return mongoose.model('Episode').findByIdAndRemove(id).exec();
        }
      });
    }
  };
});