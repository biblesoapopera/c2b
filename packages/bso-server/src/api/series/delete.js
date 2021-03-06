import validationFail from '../helpers/validationFail'

export default (db) => {
  return async (req, res, next) => {
    let result

    result = await db.series.delete({_id: req.params.id, published: false})

    if (!result) {
      return validationFail(res, {errors: {published: {msg: 'Unpublish series before deletion'}}}, next)
    }

    res.type('json')
    res.status(200)
    res.send(result)
    next()
  }
}
