export default (rbac, action, resource) => {
  return async (req, res, next) => {
    let role
    for (let i = 0; i < req.user.roles.length; i++) {
      role = req.user.roles[i]
      let allow = await new Promise ((resolve, reject) => {
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

    res.status(401)
    next('route')
  }
}
