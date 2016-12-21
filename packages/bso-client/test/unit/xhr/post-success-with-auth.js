import assert from 'bso-tools/assert'
import postFn from 'bso-client/xhr/post'
import sinon from 'sinon'

sinon.xhr = {supportsCORS: true}
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest()

let mockJwt = {set: ()=>{}, get: ()=>{}}
let jwtGet = sinon.stub(mockJwt, 'get')
let jwtSet = sinon.stub(mockJwt, 'set')

let server = sinon.fakeServer.create({autoRespond: true})
server.respondWith([
  200,
  {
    'content-type': 'application/json',
    'authorization': 'jwt mytoken'
  },
  JSON.stringify({msg: 'all good'})
])

export default async () => {
  let post = postFn(mockJwt)

  let result = await post('/testurl', {data: 123})

  assert.equal(200, result.status)
  assert.deepEqual({msg: 'all good'}, result.body)

  assert.calledOnce(jwtGet)
  assert.calledOnce(jwtSet)
  assert.calledWith(jwtSet, 'mytoken')

  // cleanup
  server.restore()
  delete global.XMLHttpRequest
}
