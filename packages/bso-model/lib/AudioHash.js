'use strict';

System.register('bso-model/AudioHash', ['mongoose'], function (_export, _context) {
  "use strict";

  var mongoose, schema;
  return {
    setters: [function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      schema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
          maxlength: 180
        },
        hash: {
          type: String,
          required: true,
          maxlength: 255
        }
      });


      mongoose.model('AudioHash', schema);
    }
  };
});