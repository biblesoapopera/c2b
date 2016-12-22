export default req => {
  if (!req.files || !req.files.img) throw new Error('no file uploaded')
  else return true
}
