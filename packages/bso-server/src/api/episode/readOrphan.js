export default (db) => {
  return async (req, res, next) => {
    let result = await db.episode.find({series: null})

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
