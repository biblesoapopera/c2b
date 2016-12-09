import find from './series/find'

export default url => {
  return {
    find: find(url)
  }
}
