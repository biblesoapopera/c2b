import assert from 'bso-tools/assert'
import errHandler from 'bso-server/errHandler'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

export default async () => {

  let stub = sinon.stub()
  let fn = errHandler(stub)

  let errObj = {}
  let req = new MockRequest()
  let res = new MockResponse()

  let arg = await new Promise((resolve, reject) => {
    try {fn(errObj, req, res, arg => resolve(arg))}
    catch (err) {reject(err)}
  })

  assert.notEqual(arg, 'route')
  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'internal server error'}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, errObj)
}
