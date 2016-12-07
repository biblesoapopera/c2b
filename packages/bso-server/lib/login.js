'use strict';

System.register('bso-server/login', ['body-parser', 'jsonwebtoken', './authenticate', './db/user/getUser'], function (_export, _context) {
  "use strict";

  var bodyParser, jwt, authenticate, getUser;
  return {
    setters: [function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }, function (_jsonwebtoken) {
      jwt = _jsonwebtoken.default;
    }, function (_authenticate) {
      authenticate = _authenticate.default;
    }, function (_dbUserGetUser) {
      getUser = _dbUserGetUser.default;
    }],
    execute: function () {
      _export('default', function (app, key) {
        app.use(bodyParser.json());

        app.post('/login', function (req, res) {
          var username = req.body.username;
          var password = req.body.password;

          if (authenticate(username, password)) {
            var user = getUser(username);
            var token = jwt.sign({ sub: user.id, name: user.name }, key);

            res.set('authorization', 'jwt ' + token);
            res.type('json');
            res.status(200);
            res.send({ msg: 'logged in' });
          } else {
            res.status(401);
            res.send({ msg: 'login fail' });
          }
        });
      });
    }
  };
});