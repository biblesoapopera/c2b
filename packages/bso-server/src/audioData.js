import express from 'express'

export default audioData => {
  return express.static(audioData)
}
