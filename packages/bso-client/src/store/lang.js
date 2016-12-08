import xhr from '../xhr'

let store = {
  en: {name: 'english', loaded: true},
  es: {name: 'español', loaded: false},
  mizo: {name: 'mizo', loaded: false},
  my: {name: 'မြန်မာ', loaded: false}
}

export default {
  load: lang => {
    return new Promise(async (resolve, reject) => {
      if (!store[lang].loaded) {
        let data = await xhr('store/lang/' + lang + '.json')
        data.name = store[lang].name
        data.loaded = true
        store[lang] = data
        resolve()
      } else {
        resolve()
      }
    })
  },
  find: lang => {
    if (store[lang] && store[lang].loaded) return store[lang]
  },
  listNames: () => {
    return Object.keys(store).map(key => [key, store[key].name])
  }
}
