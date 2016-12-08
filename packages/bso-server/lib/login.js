'use strict';

System.register('bso-server/login', ['body-parser', 'jsonwebtoken'], function (_export, _context) {
  "use strict";

  var bodyParser, jwt;
  return {
    setters: [function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }, function (_jsonwebtoken) {
      jwt = _jsonwebtoken.default;
    }],
    execute: function () {
      _export('default', function (app, key, db) {
        app.post('/login', bodyParser.json(), function (req, res) {
          var username = req.body.username;
          var password = req.body.password;

          var user = db.user.find(username);

          if (!user || user.password !== req.body.password) {
            res.status(401);
            res.send({ msg: 'login fail' });
          } else {
            var token = jwt.sign({ sub: user.username, name: user.name }, key);
            res.set('authorization', 'jwt ' + token);
            res.type('json');
            res.status(200);
            res.send({ msg: 'logged in' });
          }
        });
      });
    }
  };
});