import fail from '../helpers/fail'

export default (db) => {
  return async (req, res, next) => {
    let result
    try {
      result = await db.episode.create(req.body)
    } catch (err) {
      //TODO add validation error handling
      return fail(res, 'database error', next)
    }

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
