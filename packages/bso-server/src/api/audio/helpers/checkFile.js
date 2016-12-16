export default req => {
  if (!req.files || !req.files.audio) throw new Error('no file uploaded')
  else return true
}
