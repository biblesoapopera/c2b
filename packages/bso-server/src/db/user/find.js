import hash from 'password-hash'

export default username => {
  if (username === 'test@test.com') {
    return {
      username: 'test@test.com',
      name: 'John Test',
      password: hash.generate('test123'),
      locale: 'en-au',
      lang: 'en',
      roles: ['student']
    }
  }
}

