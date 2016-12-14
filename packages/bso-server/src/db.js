import mongoose from 'mongoose'
import user from './db/user'
import series from './db/series'
import episode from './db/episode'
import audioHash from './db/audioHash'

export default url => {
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
    audioHash: audioHash
  }
}
