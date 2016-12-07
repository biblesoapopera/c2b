export default (user, password) => {
  if (user === 'test@test.com' && password === 'test123') {
    return true
  } else {
    return false
  }
}
