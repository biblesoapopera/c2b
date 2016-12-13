'use strict';

System.register('bso-server/db/user', ['bso-model/User', 'mongoose'], function (_export, _context) {
  "use strict";

  var mongoose;
  return {
    setters: [function (_bsoModelUser) {}, function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      _export('default', {
        find: function find(username) {
          return mongoose.model('User').findOne({ username: username }).exec();
        },
        create: function create(userObj) {
          var Model = mongoose.model('User');
          var model = new Model(userObj);
          return model.save();
        }
      });
    }
  };
});