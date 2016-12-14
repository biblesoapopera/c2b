import fail from '../helpers/fail'
import validationFail from '../helpers/validationFail'
import mongoose from 'mongoose'

export default (db) => {
  return async (req, res, next) => {
    let result

    let seriesObj = req.body
    if (seriesObj.published) {
      return validationFail(res, {errors: {published: {msg: 'Cannot publish a series during update.'}}}, next)
    }

    try {
      result = await db.series.update({_id: req.params.id, published: false}, seriesObj)
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) return validationFail(res, err, next)
      return fail(res, 'database error', next)
    }

    if (!result) {
      return validationFail(res, {errors: {published: {msg: 'Cannot update a published series.'}}}, next)
    }

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
