import jwt from 'jsonwebtoken'

const fail = (res, next) => {
  res.status(401)
  res.type('json')
  res.send({msg: 'not authorized'})
  next('route')
}

export default (key, db) => {
  return (req, res, next) => {
    let authHeader = req.get('authorization')

    // not authentication attempted. identify as guest
    if (!authHeader) {
      req.user = {roles: ['guest']}
      next()
      return
    }

    if (authHeader.slice(0,3) !== 'jwt') return fail(res, next)

    let token = authHeader.slice(4)
    let payload

    try {
      payload = jwt.verify(token, key)
    } catch (err) {
      return fail(res, next)
    }

    let username = payload.sub
    if (!username) return fail(res, next)

    let user = db.user.find(username)

    if (!user) return fail(res, next)

    req.user = user
    next()
  }
}
