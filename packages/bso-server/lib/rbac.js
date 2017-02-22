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
          episode: ['create', 'read', 'update', 'delete'],
          audio: ['create', 'update', 'delete']
        },
        grants: {
          guest: ['create_user', 'forgot_password', 'readPublished_series', 'read_episode'],
          student: ['change_password', 'readPublished_series', 'read_episode'],
          donor: ['student'],
          agent: ['student'],
          editor: ['student', 'create_series', 'readAll_series', 'update_series', 'publish_series', 'unpublish_series', 'create_episode', 'update_episode', 'create_audio', 'update_audio'],
          admin: ['editor'],
          superadmin: ['admin', 'delete_series', 'delete_episode', 'delete_audio']
        }
      }));
    }
  };
});