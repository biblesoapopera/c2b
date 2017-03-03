export default () => {
  let cache = {}

  return {
    set: (name, data) => {
      cache[name] = data
    },
    get: (name) => {
      return cache[name]
    },
    has: (name) => {
      return cache[name] !== void 0
    },
    remove: (name) => {
      delete cache[name]
    }
  }
}
