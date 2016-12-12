import path from 'path'
import del from 'del'

export default audioDir => {
  return async (req, res, next) => {
    try {
      await del([path.join(audioDir, req.params.file + '.mp3')])
    } catch (err) {
      res.status(500)
      res.type('json')
      res.send({msg: 'error'})
      next('route')
      return
    }

    res.type('json')
    res.status(200)
    res.send({msg: 'delete successful'})
    next()
  }
}
