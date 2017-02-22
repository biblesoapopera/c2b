export default (xhr) => {
  return {
    create: async (obj) => {
      // TODO add mongoose model validation
      return await xhr.post('/series', obj)
    },

    'delete': () => {},

    publish: () => {},

    readLangAll: async (lang) => {
      return await xhr.get('/series/' + lang + '/all')
    },

    readLangPublished: async (lang) => {
      return await xhr.get('/series/' + lang + '/published')
    },

    unpublish: () => {},

    update: () => {}
  }
}
