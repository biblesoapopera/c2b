import path from 'path'
import checkFile from './helpers/checkFile'
import checkFilename from '../helpers/checkFilename'
import checkMime from './helpers/checkMime'

export default (episodeImgDir) => {
  return async (req, res, next) => {
    if (!checkFile(req)) return
    if (!checkFilename(req)) return
    if (!checkMime(req)) return

    let file = req.files.img

    // save file
    await new Promise((resolve, reject) => {
      file.mv(path.join(episodeImgDir, req.params.file + '.jpeg'), function(err) {
        if (err) reject(err)
        else resolve()
      })
    })

    res.type('json')
    res.status(200)
    res.send({msg: 'update successful'})
    next()
  }
}
