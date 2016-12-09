'use strict';

System.register('bso-server/api/series', ['./series/create', './series/readLang', './series/publish', './series/unpublish', './series/update', './series/delete'], function (_export, _context) {
  "use strict";

  var create, readLang, publish, unpublish, update, seriesDelete;
  return {
    setters: [function (_seriesCreate) {
      create = _seriesCreate.default;
    }, function (_seriesReadLang) {
      readLang = _seriesReadLang.default;
    }, function (_seriesPublish) {
      publish = _seriesPublish.default;
    }, function (_seriesUnpublish) {
      unpublish = _seriesUnpublish.default;
    }, function (_seriesUpdate) {
      update = _seriesUpdate.default;
    }, function (_seriesDelete) {
      seriesDelete = _seriesDelete.default;
    }],
    execute: function () {
      _export('default', {
        create: create,
        readLang: readLang,
        publish: publish,
        unpublish: unpublish,
        update: update,
        seriesDelete: seriesDelete
      });
    }
  };
});