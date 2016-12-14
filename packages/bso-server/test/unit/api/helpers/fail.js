import assert from 'bso-tools/assert'
import fail from 'bso-server/api/helpers/fail'
import sinon from 'sinon'
import path from 'path'
import crypto from 'crypto'

export default async () => {
  let res = {
    send: ()=>{},
    status: ()=>{},
    type: ()=>{}
  }
  let next = sinon.stub()
  let send = sinon.stub(res, 'send')
  let status = sinon.stub(res, 'status')
  let type = sinon.stub(res, 'type')

  fail(res, 'my message', next)

  assert.calledOnce(type)
  assert.calledWith(type, 'json')

  assert.calledOnce(status)
  assert.calledWith(status, 500)

  assert.calledOnce(send)
  assert.calledWith(send, {msg: 'my message'})

  assert.calledOnce(next)
  assert.calledWith(next, 'route')
}
