import fail from '../helpers/fail'

export default (db) => {
  return async (req, res, next) => {
    let result
    try {
      result = await db.episode.find({_id: req.params.id, series: {$exists: true}})
    } catch (err) {
      return fail(res, 'database error', next)
    }

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
