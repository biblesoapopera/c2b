export default (res, err, next) => {
  res.status(401)
  res.type('json')
  res.send({errors: err.errors})
  next('route')
  return
}
