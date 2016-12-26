export default (db) => {
  return async (req, res, next) => {
    let result = await db.episode.findId(req.params.id)

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
