import assert from 'bso-tools/assert'
import validationFail from 'bso-server/api/helpers/validationFail'
import sinon from 'sinon'

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

  validationFail(res, {errors: []}, next)

  assert.calledOnce(type)
  assert.calledWith(type, 'json')

  assert.calledOnce(status)
  assert.calledWith(status, 401)

  assert.calledOnce(send)
  assert.calledWith(send, {errors: []})

  assert.calledOnce(next)
  assert.calledWith(next, 'route')
}
