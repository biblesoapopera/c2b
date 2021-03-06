'use strict';

System.register('bso-model/User', ['babel-runtime/core-js/object/keys', 'mongoose', './role', './country', './lang'], function (_export, _context) {
  "use strict";

  var _Object$keys, mongoose, role, country, lang, schema;

  return {
    setters: [function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys.default;
    }, function (_mongoose) {
      mongoose = _mongoose.default;
    }, function (_role) {
      role = _role.default;
    }, function (_country) {
      country = _country.default;
    }, function (_lang) {
      lang = _lang.default;
    }],
    execute: function () {
      schema = new mongoose.Schema({
        username: {
          type: String,
          required: true,
          maxlength: 120,
          minlength: 4
        },
        password: {
          type: String,
          required: true,
          maxlength: 120,
          minlength: 8
        },
        loginVersion: {
          type: Number,
          required: true,
          min: 0,
          default: 0
        },
        name: {
          type: String,
          maxlength: 120,
          minlength: 3
        },
        roles: {
          type: Array,
          default: ['guest'],
          validate: function validate(val) {
            return val.every(function (v) {
              return role.indexOf(v) !== -1;
            });
          }
        },
        country: {
          type: String,
          default: 'au',
          validate: function validate(val) {
            return _Object$keys(country).indexOf(val) !== -1;
          }
        },
        lang: {
          type: String,
          default: 'en',
          validate: function validate(val) {
            return _Object$keys(lang).indexOf(val) !== -1;
          }
        }
      });


      mongoose.model('User', schema);
    }
  };
});