export default (xhr) => {
  return {
    create: async () => {
    },
    'delete': () => {},
    readId: async (id) => {
      return await xhr.get('/episode/' + id)
    },
    update: () => {}
  }
}
