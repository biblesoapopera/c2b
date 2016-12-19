import mongoose from 'mongoose'
import user from './db/user'
import series from './db/series'
import episode from './db/episode'
import audioHash from './db/audioHash'
import revokedToken from './db/revokedToken'

export default url => {
  mongoose.Promise = Promise
  if (
    mongoose.connection.readyState === 0 || //disconnected
    mongoose.connection.readyState === 3    //disconnecting
  ){
    mongoose.connect(url)
  }

  return {
    user: user,
    series: series,
    episode: episode,
    audioHash: audioHash,
    revokedToken: revokedToken
  }
}
