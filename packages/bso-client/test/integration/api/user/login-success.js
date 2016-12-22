import server from 'bso-server/server'
import serverConfigFn from 'bso-client/test/resource/test-server-config'
import mongoose from 'mongoose'
import hash from 'password-hash'
import api from 'bso-client/test/resource/test-client-api'
import assert from 'bso-tools/assert'

let serverConfig = serverConfigFn('login-success')

export let timeout = 5000
export default async () => {
  if (server.listening()) await server.stop()
  await server.start(serverConfig)

  // create user to query against
  await serverConfig.db.user.create({
    username: 'test@test.com',
    password: hash.generate('test123'),
    name: 'John Test',
    roles: ['student'],
    loginVersion: 1
  })

  // run test
  let result = await api.user.login('test@test.com', 'test123')

  assert.ok(result)

  let user = await api.user.active()
  assert.equal('John Test', user.name)
  assert.deepEqual(['student'], user.roles)

  // cleanup
  await server.stop()

  await new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase(err => {
      if (err) reject(err)
      else resolve()
    })
  })
  mongoose.connection.close()
}

