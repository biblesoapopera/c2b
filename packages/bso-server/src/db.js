import mongoose from 'mongoose'
import user from './db/user'
import series from './db/series'
import episode from './db/episode'

export default url => {
  mongoose.connect(url)
  return {
    user: user,
    series: series,
    episode: episode
  }
}
