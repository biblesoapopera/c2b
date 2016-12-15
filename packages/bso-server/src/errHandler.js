export default () => {
  return (err, req, res, next) => {
    // TODO log to server log file
    let log = err

    res.status(500)
    res.type('json')
    res.send({msg: 'internal server error'})
    next()
  }
}
