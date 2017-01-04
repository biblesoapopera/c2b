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
        let res = await xhr.get('lang/' + lang + '.json')
        if (res.status !== 200 && res.status !== 304) {
          throw new Error(res)
        }

        res.body.name = store[lang].name
        res.body.loaded = true
        store[lang] = res.body
      }

      return store[lang]
    },

    readSync: lang => {
      if (store[lang] && store[lang].loaded) return store[lang]
    },

    listNames: () => {
      return Object.keys(store).map(key => [key, store[key].name])
    },

    getName: lang => {
      return store[lang].name
    }
  }
}
