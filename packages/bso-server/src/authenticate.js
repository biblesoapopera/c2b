import jwt from 'jsonwebtoken'

const fail = (res, next) => {
  res.status(401)
  res.type('json')
  res.send({msg: 'not authorized'})
  next('route')
}

let updateTokenExpiry = (payload, user, key, res) => {
  if (payload.exp < Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 8)) {
    let token = jwt.sign({
      sub: user.username,
      name: user.name,
      lv: user.loginVersion,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 10) // Expires in ten days
    }, key)
    res.set('authorization', 'jwt ' + token)
  }
}

export default (key, db) => {
  return async (req, res, next) => {
    let authHeader = req.get('authorization')

    // not authentication attempted. identify as guest
    if (!authHeader) {
      req.user = {roles: ['guest']}
      next()
      return
    }

    if (authHeader.slice(0,3) !== 'jwt') return fail(res, next)

    let token = authHeader.slice(4)

    // check token not revoked
    if (await db.revokedToken.exists(token)) return fail(res, next)

    let payload

    try {
      // check signature and expiry
      payload = jwt.verify(token, key)
    } catch (err) {
      return fail(res, next)
    }

    if (!payload.exp || !payload.sub || !payload.lv) return fail(res, next)

    let user = await db.user.find({username: payload.sub})
    if (!user) return fail(res, next)

    // check login version
    if (payload.lv !== user.loginVersion) return fail(res, next)

    // all checks complete. token good.

    // update token expiry if token will expire in less than eight days
    updateTokenExpiry(payload, user, key, res)

    req.user = user
    req.token = {
      value: token,
      payload: payload
    }

    next()
  }
}
