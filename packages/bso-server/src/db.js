import mongoose from 'mongoose'
import user from './db/user'
import series from './db/series'
import episode from './db/episode'
import audioHash from './db/audioHash'
import revokedToken from './db/revokedToken'

let connect = url => {
  let connection = mongoose.connection

  connection.on('error', err => {
    console.error('error connecting with mongodb database:', err)
  })

  connection.on('disconnected', () => connect(url))

  if (
    connection.readyState === 0 || // disconnected
    connection.readyState === 3    // disconnecting
  ){
    mongoose.connect(url)
  }
}

export default url => {
  mongoose.Promise = Promise

  connect(url)

  return {
    user: user,
    series: series,
    episode: episode,
    audioHash: audioHash,
    revokedToken: revokedToken
  }
}
