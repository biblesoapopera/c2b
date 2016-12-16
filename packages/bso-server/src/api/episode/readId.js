export default (db) => {
  return async (req, res, next) => {
    let result = await db.episode.find({_id: req.params.id, series: {$exists: true}})

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
