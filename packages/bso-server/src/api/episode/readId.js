export default (db) => {
  return async (req, res, next) => {
    let episode = await db.episode.find(req.params.id)
    res.type('json')
    res.status(200)
    res.send(episode)
    next()
  }
}
