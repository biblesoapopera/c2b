export default (xhr, jwt) => {
  let active

  return {
    login: async (username, password) => {
      let result = await xhr.post('/user/login', {username: username, password: password})

      if (result.status === 500) {
        active = undefined
        jwt.remove()
        throw new Error(result.body.msg)
      } else if (result.status !== 200) {
        active = undefined
        jwt.remove()
        return false
      }

      active = result.body
      return true
    },
    logout: async () => {
      let result = await xhr.get('/user/logout')

      if (result.status === 500) {
        throw new Error(result.body.msg)
      } else if (result.status !== 200) {
        return false
      }

      jwt.remove()
      active = undefined

      return true
    },
    active: async () => {
      if (!active) {
        let token = jwt.get()
        if (token) {
          let result = await xhr.get('/user/active')

          if (result.status === 500) {
            throw new Error(result.body.msg)
          } else if (result.status === 200) {
            active = result.body
          }
        } else {
          active = {roles: ['guest']}
        }
      }
      return active
    }
  }
}
