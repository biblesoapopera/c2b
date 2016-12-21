import server from 'bso-server/server'
import serverConfig from 'bso-client/test/resource/test-server-config'
import mongoose from 'mongoose'
import hash from 'password-hash'
import apiFn from 'bso-client/api'
import xhr from 'bso-client/xhr'
import jwt from 'bso-client/jwt'
import XMLHttpRequest from 'xhr2'
import localStorage from 'bso-client/test/resource/localStorage'
import assert from 'bso-tools/assert'

XMLHttpRequest.nodejsSet({baseUrl: 'http://localhost:8088'})
global.XMLHttpRequest = XMLHttpRequest
global.localStorage = localStorage

let api = apiFn(xhr(jwt))

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
  let result = await api.login('test@test.com', 'test123')

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

