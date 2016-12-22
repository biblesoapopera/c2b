export default xhr => {
  let store = {
    en: {name: 'english', loaded: true},
    es: {name: 'español', loaded: false},
    mizo: {name: 'mizo', loaded: false},
    my: {name: 'မြန်မာ', loaded: false}
  }

  return {
    read: async lang => {
      if (!store[lang]) return

      if (!store[lang].loaded) {
        let data = await xhr.get('lang/' + lang + '.json')
        data.name = store[lang].name
        data.loaded = true
        store[lang] = data
      }

      return store[lang]
    },
    readSync: lang => {
      if (store[lang] && store[lang].loaded) return store[lang]
    },
    listNames: () => {
      return Object.keys(store).map(key => [key, store[key].name])
    }
  }
}
