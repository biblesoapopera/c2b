let active
export default xhr => {
  return {
    login: async (username, password) => {
      let result = await xhr.post('/login', {username: username, password: password})

      if (result.status === 500) {
        throw new Error(result.body.msg)
      } else if (result.status !== 200) {
        return false
      }

      active = result.body
      return true
    },
    active: () => {
      if (!active) return {roles: ['guest']}
      else return active
    }
  }
}
