'use strict';

System.register('bso-server/config', ['path'], function (_export, _context) {
  "use strict";

  var path;
  return {
    setters: [function (_path) {
      path = _path.default;
    }],
    execute: function () {
      _export('default', {
        jwtKey: 'D3zXfkA157ISE3i7S74YUF3qFcY0sicn',
        dbUrl: 'mongodb://localhost:27017/c2b',
        audioDir: path.join(__dirname, '..', '..', '..', 'audio_lib')
      });
    }
  };
});