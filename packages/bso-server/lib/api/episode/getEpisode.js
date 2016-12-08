'use strict';

System.register('bso-server/api/episode/getEpisode', ['../../authorize', '../../authenticate'], function (_export, _context) {
  "use strict";

  var authorize, authenticate;
  return {
    setters: [function (_authorize) {
      authorize = _authorize.default;
    }, function (_authenticate) {
      authenticate = _authenticate.default;
    }],
    execute: function () {
      _export('default', function (app, key, rbac, db) {
        app.get('/episode/:lang/:sid/:eid', authenticate(key, db), authorize(rbac, 'read', 'episode'), function (req, res) {
          var episode = db.episode.find(req.params.lang, req.params.sid, req.params.eid);
          res.type('json');
          res.status(200);
          res.send(episode);
        });
      });
    }
  };
});