import jwt from 'jsonwebtoken'
import hash from 'password-hash'
import fail from './api/helpers/fail'
/*
export default (key, db) => {
  return async (req, res, next) => {
    let authHeader = req.get('authorization')

    if (!authHeader) return fail(res, 'no auth header', next)

    if (authHeader.slice(0,3) !== 'jwt') return fail(res, next)


    let username = req.body.username
    let password = req.body.password

    if (!username || !password) return authenticaionFail(res, next)

    let token = authHeader.slice(4)
    let payload

    try {
      payload = jwt.verify(token, key)
    } catch (err) {
      return fail(res, next)
    }

    //TODO!!!!!!!!!!!

    let user
    try {
      user = await db.user.find({username: username})
    } catch (err) {
      return fail(res, 'database error', next)
    }

    if (!user) return authenticaionFail(res, next)

    if (!hash.verify(password, user.password)) return authenticaionFail(res, next)

    let token = jwt.sign({
      sub: user.username,
      name: user.name,
      pwv: user.passwordVersion,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 10) // Expires in ten days
    }, key)
    res.set('authorization', 'jwt ' + token)
    res.type('json')
    res.status(200)
    res.send({msg: 'logged in'})

    req.user = user
    next()
  }
}
*/
