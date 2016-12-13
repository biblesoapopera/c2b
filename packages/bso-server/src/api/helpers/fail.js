export default (res, msg, next) => {
  res.status(500)
  res.type('json')
  res.send({msg: msg})
  next('route')
  return
}
