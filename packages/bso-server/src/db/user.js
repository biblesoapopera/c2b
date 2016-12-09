import find from './user/find'

export default url => {
  return {
    find: find(url)
  }
}
