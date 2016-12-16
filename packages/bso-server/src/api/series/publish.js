import validationFail from '../helpers/validationFail'
import mongoose from 'mongoose'

export default (db) => {
  return async (req, res, next) => {
    let result

    try {
      result = await db.series.update({_id: req.params.id}, {published: true})
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) return validationFail(res, err, next)
      throw err
    }

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
