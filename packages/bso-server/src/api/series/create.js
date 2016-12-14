import fail from '../helpers/fail'
import validationFail from '../helpers/validationFail'
import mongoose from 'mongoose'

export default (db) => {
  return async (req, res, next) => {
    let result

    let seriesObj = req.body
    if (seriesObj.published) {
      return validationFail(
        res,
        {errors: {published: {msg: 'When creating a series, published field must be false.'}}},
        next
      )
    }

    try {
      result = await db.series.create(seriesObj)
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) return validationFail(res, err, next)
      return fail(res, 'database error', next)
    }

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
