export default (db) => {
  return (req, res, next) => {
    let episode = db.series.find(req.params.id)
    res.type('json')
    res.status(200)
    res.send(episode)
  }
}
