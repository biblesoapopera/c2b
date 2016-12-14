'use strict';

System.register('bso-server/api/episode', ['./episode/create', './episode/readId', './episode/readOrphan', './episode/update', './episode/delete'], function (_export, _context) {
  "use strict";

  var create, readId, readOrphan, update, episodeDelete;
  return {
    setters: [function (_episodeCreate) {
      create = _episodeCreate.default;
    }, function (_episodeReadId) {
      readId = _episodeReadId.default;
    }, function (_episodeReadOrphan) {
      readOrphan = _episodeReadOrphan.default;
    }, function (_episodeUpdate) {
      update = _episodeUpdate.default;
    }, function (_episodeDelete) {
      episodeDelete = _episodeDelete.default;
    }],
    execute: function () {
      _export('default', {
        create: create,
        readId: readId,
        readOrphan: readOrphan,
        update: update,
        'delete': episodeDelete
      });
    }
  };
});