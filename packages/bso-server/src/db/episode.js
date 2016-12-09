import find from './episode/find'

export default url => {
  return {
    find: find(url)
  }
}
