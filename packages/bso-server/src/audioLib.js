import express from 'express'

export default audioDir => {
  return express.static(audioDir)
}
