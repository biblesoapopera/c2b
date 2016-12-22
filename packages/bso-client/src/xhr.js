import get from './xhr/get'
import post from './xhr/post'

export default (jwt, XMLHttpRequest) => {
  return {
    get: get(jwt, XMLHttpRequest),
    post: post(jwt, XMLHttpRequest)
  }
}

