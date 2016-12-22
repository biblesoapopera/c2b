import assert from 'bso-tools/assert'
import postFn from 'bso-client/xhr/post'
import sinon from 'sinon'

sinon.xhr = {supportsCORS: true}
let fakeXMLHttpRequest = sinon.useFakeXMLHttpRequest()
let mockJwt = {set: ()=>{}, get: ()=>{}}
let jwtGet = sinon.stub(mockJwt, 'get')
let jwtSet = sinon.stub(mockJwt, 'set')

let server = sinon.fakeServer.create({autoRespond: true})
server.respondWith([
  200,
  {
    'content-type': 'application/json'
  },
  JSON.stringify({msg: 'all good'})
])

export default async () => {
  let post = postFn(mockJwt, fakeXMLHttpRequest)

  let result = await post('/testurl', {data: 123})

  assert.equal(200, result.status)
  assert.deepEqual({msg: 'all good'}, result.body)

  assert.calledOnce(jwtGet)
  assert.notCalled(jwtSet)

  // cleanup
  server.restore()
  delete global.XMLHttpRequest
}
