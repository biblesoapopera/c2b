import filenameReservedRegex from 'filename-reserved-regex'

export default req => {
  if (
    !req.params ||
    !req.params.file ||
    filenameReservedRegex().test(req.params.file)
  ) {
    throw new Error('invalid filename')
  } else {
    return true
  }
}
