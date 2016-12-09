export default (db) => {
  return (req, res, next) => {
    let series = db.series.find(req.params.lang)
    res.type('json')
    res.status(200)
    res.send(series)
  }
}
