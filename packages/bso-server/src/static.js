import path from 'path'
import express from 'express'

export default () => {
  return express.static(path.dirname(require.resolve('bso-client/dist/index.html')))
}
