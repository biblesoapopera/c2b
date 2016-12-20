import path from 'path'
import db from './db'
import rbac from './rbac'
import logger from './logger'

export default {
  key: 'D3zXfkA157ISE3i7S74YUF3qFcY0sicn',
  rbac: rbac,
  db: db('mongodb://localhost:27017/c2b'),
  audioData: path.join(__dirname, '..', '..', '..', 'data', 'audio'),
  imgData: path.join(__dirname, '..', '..', '..', 'data', 'img'),
  port: 8080,
  logger: logger
}
