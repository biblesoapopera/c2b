let store = {}

export default {
  setItem: (key, value) => {
    store[key] = value
  },
  getItem: key => {
    return store[key]
  },
  removeItem: key => {
    delete store[key]
  }
}
