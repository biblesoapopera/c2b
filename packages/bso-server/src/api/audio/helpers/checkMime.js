import fail from '../../helpers/fail'

export default (req, res, next) => {
  let file = req.files.audio
  if (!/audio\/mpeg3/.test(file.mimetype)) fail(res, 'uploaded file is not an mp3 audio file', next)
  else return true
}
