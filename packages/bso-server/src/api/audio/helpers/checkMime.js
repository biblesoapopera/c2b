export default req => {
  let file = req.files.audio
  if (!/audio\/mpeg3/.test(file.mimetype)) throw new Error('uploaded file is not an mp3 audio file')
  else return true
}
