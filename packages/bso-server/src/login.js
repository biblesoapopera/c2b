import jwt from 'jsonwebtoken'
import hash from 'password-hash'

const fail = (res, next) => {
  res.status(401)
  res.type('json')
  res.send({msg: 'login fail'})
  next('route')
}

export default (key, db) => {
  return (req, res, next) => {

    let username = req.body.username
    let password = req.body.password

    if (!username || !password) return fail(res, next)

    let user = db.user.find(username)
    if (!user) return fail(res, next)

    if (!hash.verify(password, user.password)) return fail(res, next)

    let token = jwt.sign({sub: user.username, name: user.name}, key)
    res.set('authorization', 'jwt ' + token)
    res.type('json')
    res.status(200)
    res.send({msg: 'logged in'})

    req.user = user
    next()
  }
}
