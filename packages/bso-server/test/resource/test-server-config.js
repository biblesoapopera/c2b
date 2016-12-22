import path from 'path'
import db from 'bso-server/db'
import rbac from 'bso-server/rbac'
import logger from 'bso-server/logger'

export default testName => {
  return {
    key: 'testing testing',
    rbac: rbac,
    db: db('mongodb://localhost:27020/' + testName),
    audioData: path.join(__dirname, '..', '..', '..', 'testdata', 'audio'),
    langData: path.join(__dirname, '..', '..', '..', 'testdata', 'lang'),
    episodeImgData: path.join(__dirname, '..', '..', '..', 'testdata', 'episode-img'),
    port: 8088,
    logger: logger
  }
}
