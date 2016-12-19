import jwt from 'jsonwebtoken'
import hash from 'password-hash'

const authenticaionFail = (res, next) => {
  res.status(401)
  res.type('json')
  res.send({msg: 'login fail'})
  next('route')
}

export default (key, db) => {
  return async (req, res, next) => {

    let username = req.body.username
    let password = req.body.password

    if (!username || !password) return authenticaionFail(res, next)

    let user
    try {
      user = await db.user.find({username: username})
    } catch (err) {
      throw new Error('db.user.find database error. username: ' + username)
    }

    if (!user) return authenticaionFail(res, next)

    if (!hash.verify(password, user.password)) return authenticaionFail(res, next)

    let token = jwt.sign({
      sub: user.username,
      name: user.name,
      lv: user.loginVersion,
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
