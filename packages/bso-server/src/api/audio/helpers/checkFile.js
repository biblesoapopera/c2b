import fail from '../../helpers/fail'

export default (req, res, next) => {
  if (!req.files || !req.files.audio) fail(res, 'no file uploaded', next)
  else return true
}
