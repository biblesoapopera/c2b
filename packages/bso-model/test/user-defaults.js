import User from 'bso-model/User'
import chai from 'chai'

let assert = chai.assert

export default () => {
  let user = new User({
    username: 'abc',
    password: '123'
  })

  assert.sameMembers(user.roles, ['guest'])
  assert.equal(user.locale, 'en-au')
  assert.equal(user.lang, 'en')
}
