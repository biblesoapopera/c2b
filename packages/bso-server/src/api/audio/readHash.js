import checkFilename from '../helpers/checkFilename'

export default (audioDir, db) => {
  return async (req, res, next) => {
    if (!checkFilename(req)) return

    let file = req.params.file

    let hash = (await db.audioHash.find(req.params.file + '.mp3')).hash

    res.type('json')
    res.status(200)
    res.send({hash: hash})
    next()
  }
}

