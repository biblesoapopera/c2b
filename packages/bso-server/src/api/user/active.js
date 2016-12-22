export default () => {
  return async (req, res, next) => {
    res.type('json')
    res.status(200)
    res.send({
      username: req.user.username,
      name: req.user.name,
      lang: req.user.lang,
      roles: req.user.roles
    })
    next()
  }
}
