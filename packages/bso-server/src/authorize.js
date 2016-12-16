export default (rbac, action, resource) => {
  return async (req, res, next) => {
    let role
    let allow

    for (let i = 0; i < req.user.roles.length; i++) {
      role = req.user.roles[i]

      allow = await new Promise ((resolve, reject) => {
        rbac.can(role, action, resource, (err, can) => {
          if (err) {
            reject(err)
            return
          }
          resolve(!!can)
        })
      })

      if (allow) {
        next()
        return
      }
    }

    res.status(403)
    res.type('json')
    res.send({msg: 'not authorized'})
    next('route')
  }
}
