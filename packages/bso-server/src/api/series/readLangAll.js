export default (db) => {
  return async (req, res, next) => {
    let result

    result = await db.series.find({lang: req.params.lang})

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
