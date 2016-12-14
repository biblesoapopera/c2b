'use strict';

System.register('bso-server/rbac', ['rbac', 'bso-model/role'], function (_export, _context) {
  "use strict";

  var RBAC, role;
  return {
    setters: [function (_rbac) {
      RBAC = _rbac.default;
    }, function (_bsoModelRole) {
      role = _bsoModelRole.default;
    }],
    execute: function () {
      _export('default', new RBAC({
        roles: role,
        permissions: {
          password: ['change', 'forgot'],
          user: ['create', 'read', 'update', 'delete'],
          series: ['create', 'readAll', 'readPublished', 'update', 'delete', 'publish', 'unpublish'],
          episode: ['create', 'read', 'readOrphan', 'update', 'delete'],
          audio: ['create', 'update', 'delete']
        },
        grants: {
          guest: ['create_user', 'forgot_password', 'readPublished_series', 'read_episode'],
          student: ['change_password', 'readPublished_series', 'read_episode'],
          donor: ['student'],
          agent: ['student'],
          admin: ['student', 'create-series', 'readAll-series', 'update-series', 'publish-series', 'unpublish-series', 'create-episode', 'readOrphan-episode', 'update-episode', 'create-audio', 'update-audio'],
          superadmin: ['admin', 'delete-series', 'delete-episode', 'delete-audio']
        }
      }));
    }
  };
});