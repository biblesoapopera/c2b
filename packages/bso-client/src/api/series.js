export default (xhr) => {
  return {
    create: async (obj) => {
      // TODO add mongoose model validation
      let result = await xhr.post('/series', obj)

      if (result.status === 500) {
        throw new Error(result.body.msg)
      } else if (result.status !== 200) {
        return false
      }

      return result.body
    },

    'delete': () => {},
    publish: () => {},
    readLangAll: () => {},
    readLangPublished: () => {},
    unpublish: () => {},
    update: () => {}
  }
}
