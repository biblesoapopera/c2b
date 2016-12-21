import get from './xhr/get'
import post from './xhr/post'

export default jwt => {
  return {
    get: get,
    post: post(jwt)
  }
}

