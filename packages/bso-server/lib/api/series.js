'use strict';

System.register('bso-server/api/series', ['./series/create', './series/readLangAll', './series/readLangPublished', './series/publish', './series/unpublish', './series/update', './series/delete'], function (_export, _context) {
  "use strict";

  var create, readLangAll, readLangPublished, publish, unpublish, update, seriesDelete;
  return {
    setters: [function (_seriesCreate) {
      create = _seriesCreate.default;
    }, function (_seriesReadLangAll) {
      readLangAll = _seriesReadLangAll.default;
    }, function (_seriesReadLangPublished) {
      readLangPublished = _seriesReadLangPublished.default;
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
        readLangAll: readLangAll,
        readLangPublished: readLangPublished,
        publish: publish,
        unpublish: unpublish,
        update: update,
        seriesDelete: seriesDelete
      });
    }
  };
});