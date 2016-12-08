import jwt from 'jsonwebtoken'

export default (key, db) => {
  return (req, res, next) => {
    let authHeader = req.get('authorization')

    if (authHeader.slice(0,3) !== 'jwt') {
      res.status(401)
      next('route')
      return
    }

    let token = authHeader.slice(4)
    let payload

    try {
      payload = jwt.verify(token, key)
    } catch (err) {
      res.status(401)
      next('route')
      return
    }

    let username = payload.sub

    let user = db.user.find(username)

    if (!user) {
      res.status(401)
      next('route')
      return
    }

    req.user = user
    next()
  }
}
