'use strict';

System.register('bso-server/api/episodeImg', ['./episodeImg/create', './episodeImg/update', './episodeImg/delete'], function (_export, _context) {
  "use strict";

  var create, update, deleteEpisodeImg;
  return {
    setters: [function (_episodeImgCreate) {
      create = _episodeImgCreate.default;
    }, function (_episodeImgUpdate) {
      update = _episodeImgUpdate.default;
    }, function (_episodeImgDelete) {
      deleteEpisodeImg = _episodeImgDelete.default;
    }],
    execute: function () {
      _export('default', {
        create: create,
        update: update,
        delete: deleteEpisodeImg
      });
    }
  };
});