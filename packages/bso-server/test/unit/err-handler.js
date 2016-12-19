import assert from 'bso-tools/assert'
import errHandler from 'bso-server/errHandler'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let next = sinon.stub()

export default async () => {

  let logger = sinon.stub()
  let fn = errHandler(logger)

  let errObj = {}
  let req = new MockRequest()
  let res = new MockResponse()

  await fn(errObj, req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)

  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'internal server error'}, res._getJSON())

  assert.calledOnce(logger)
  assert.calledWith(logger, errObj)
}
