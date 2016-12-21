import path from 'path'
import db from 'bso-server/db'
import rbac from 'bso-server/rbac'
import logger from 'bso-server/logger'

export default {
  key: 'testing testing',
  rbac: rbac,
  db: db('mongodb://localhost:27020/c2b-test'),
  audioData: path.join(__dirname, '..', '..', '..', 'testdata', 'audio'),
  imgData: path.join(__dirname, '..', '..', '..', 'testdata', 'img'),
  port: 8088,
  logger: logger
}
