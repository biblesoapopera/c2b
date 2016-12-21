import userFn from './api/user'

export default xhr => {
  let user = userFn(xhr)
  return {
    login: user.login,
    user: user
  }
}
