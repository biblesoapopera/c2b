import fail from '../../helpers/fail'
import filenameReservedRegex from 'filename-reserved-regex'

export default (req, res, next) => {
  if (
    !req.params ||
    !req.params.file ||
    filenameReservedRegex().test(req.params.file)
  ) {
    fail(res, 'invalid filename', next)
  } else {
    return true
  }
}
