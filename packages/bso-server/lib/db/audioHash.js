'use strict';

System.register('bso-server/db/audioHash', ['bso-model/AudioHash', 'mongoose'], function (_export, _context) {
  "use strict";

  var mongoose;
  return {
    setters: [function (_bsoModelAudioHash) {}, function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      _export('default', {
        find: function find(name) {
          return mongoose.model('AudioHash').findOne({ name: name }).exec();
        },
        create: function create(name, hash) {
          var Model = mongoose.model('AudioHash');
          var model = new Model({ name: name, hash: hash });
          return model.save();
        },
        update: function update(name, hash) {
          return mongoose.model('AudioHash').findOneAndUpdate({ name: name }, { hash: hash }, { runValidators: true }).exec();
        },
        delete: function _delete(name) {
          return mongoose.model('AudioHash').findOneAndRemove({ name: name }).exec();
        }
      });
    }
  };
});