'use strict';

System.register('bso-model/AudioHash', ['babel-runtime/core-js/promise', 'mongoose'], function (_export, _context) {
  "use strict";

  var _Promise, mongoose, schema;

  return {
    setters: [function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {

      mongoose.Promise = _Promise;

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