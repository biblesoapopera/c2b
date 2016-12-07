import path from 'path'
import express from 'express'

export default app => {
  app.use(express.static(path.dirname(require.resolve('bso-client/dist/index.html'))))
}
