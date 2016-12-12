import path from 'path'
import express from 'express'

export default () => {
  return express.static('/audio', path.join(__dirname, '..', '..', '..', 'audio_lib'))
}
