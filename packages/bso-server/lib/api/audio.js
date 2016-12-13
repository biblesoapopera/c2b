'use strict';

System.register('bso-server/api/audio', ['./audio/create', './audio/update', './audio/delete'], function (_export, _context) {
  "use strict";

  var create, update, deleteAudio;
  return {
    setters: [function (_audioCreate) {
      create = _audioCreate.default;
    }, function (_audioUpdate) {
      update = _audioUpdate.default;
    }, function (_audioDelete) {
      deleteAudio = _audioDelete.default;
    }],
    execute: function () {
      _export('default', {
        create: create,
        update: update,
        delete: deleteAudio
      });
    }
  };
});