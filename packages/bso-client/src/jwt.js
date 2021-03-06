let jwt

export default localStorage => {
  return {
    remove: () => {
      localStorage.removeItem('jwt')
      jwt = undefined
    },
    get: () => {
      if (!jwt) {
        jwt = localStorage.getItem('jwt')
      }
      return jwt
    },
    set: (newJwt) => {
      if (newJwt !== jwt) {
        jwt = newJwt
        localStorage.setItem('jwt', jwt)
      }
    }
  }
}
