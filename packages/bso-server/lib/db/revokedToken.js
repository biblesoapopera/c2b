'use strict';

System.register('bso-server/db/revokedToken', ['bso-model/RevokedToken', 'mongoose'], function (_export, _context) {
  "use strict";

  var mongoose, Model;
  return {
    setters: [function (_bsoModelRevokedToken) {}, function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      Model = mongoose.model('RevokedToken');

      _export('default', {
        exists: function exists(token) {
          return Model.count({ token: token }).exec();
        },
        create: function create(token, exp) {
          var model = new Model({ token: token, exp: exp });
          return model.save();
        },
        clean: function clean() {
          var now = Math.floor(Date.now() / 1000);
          return mongoose.model('RevokedToken').remove({ exp: { $lt: now } }).exec();
        }
      });
    }
  };
});