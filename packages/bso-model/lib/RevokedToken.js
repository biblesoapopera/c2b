'use strict';

System.register('bso-model/RevokedToken', ['mongoose'], function (_export, _context) {
  "use strict";

  var mongoose, schema;
  return {
    setters: [function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      schema = new mongoose.Schema({
        token: {
          type: String,
          required: true,
          unique: true
        },
        exp: {
          type: Number,
          required: true
        }
      });


      mongoose.model('RevokedToken', schema);
    }
  };
});