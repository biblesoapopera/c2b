export default (logger) => {
  return (err, req, res, next) => {
    logger(err)

    res.status(500)
    res.type('json')
    res.send({msg: 'internal server error'})
    next()
  }
}
