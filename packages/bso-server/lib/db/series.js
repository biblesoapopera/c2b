'use strict';

System.register('bso-server/db/series', ['bso-model/Series', 'mongoose'], function (_export, _context) {
  "use strict";

  var mongoose;
  return {
    setters: [function (_bsoModelSeries) {}, function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      _export('default', {
        find: function find(conditions) {
          return mongoose.model('Series').find(conditions).exec();
        },
        findId: function findId(id) {
          return mongoose.model('Series').findById(id).exec();
        },
        create: function create(seriesObj) {
          var Model = mongoose.model('Series');
          var model = new Model(seriesObj);
          return model.save();
        },
        update: function update(conditions, seriesObj) {
          return mongoose.model('Series').findOneAndUpdate(conditions, seriesObj, { runValidators: true }).exec();
        },
        delete: function _delete(conditions) {
          return mongoose.model('Series').findOneAndRemove(conditions).exec();
        }
      });
    }
  };
});