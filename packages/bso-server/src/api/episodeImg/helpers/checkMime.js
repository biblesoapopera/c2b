export default req => {
  let file = req.files.audio
  if (!/image\/jpeg/.test(file.mimetype)) throw new Error('uploaded file is not an jpg image file')
  else return true
}
