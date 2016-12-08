import RBAC from 'rbac'
import role from 'bso-model/role'

export default new RBAC({
  roles: role,
  permissions: {
    password: ['change', 'forgot'],
    user: ['create', 'read', 'update', 'delete'],
    series: ['create', 'read', 'update', 'delete'],
    episode: ['create', 'read', 'update', 'delete']
  },
  grants: {
    guest: ['create_user', 'forgot_password', 'read_series', 'read_episode'],
    student: ['change_password', 'read_series', 'read_episode'],
    donor: ['student'],
    agent: ['student'],
    admin: ['student', 'create-series', 'update-series', 'create-episode', 'update-episode'],
    superadmin: ['admin', 'delete-series', 'delete-episode']
  }
})
