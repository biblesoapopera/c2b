import user from './db/user'
import series from './db/series'
import episode from './db/episode'

export default url => {
  return {
    user: user(url),
    series: series(url),
    episode: episode(url)
  }
}
