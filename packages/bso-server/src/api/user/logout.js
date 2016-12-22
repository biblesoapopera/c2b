export default (db) => {
  return async (req, res, next) => {
    await db.revokedToken.create(req.token.value, req.token.payload.exp)

    res.removeHeader('authorization')

    res.type('json')
    res.status(200)
    res.send({msg: 'logged out'})

    next()
  }
}
