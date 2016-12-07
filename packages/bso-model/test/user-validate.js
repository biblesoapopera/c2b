import User from 'bso-model/User'

export default () => {
  return new Promise((resolve, reject) => {
    let user = new User({
      username: 'abcd',
      password: '12345678',
      roles: ['student'],
      locale: 'en-au',
      lang: 'en'
    })

    user.validate(err => {
      if (!err) resolve()
      else reject(err)
    })
  })
}
