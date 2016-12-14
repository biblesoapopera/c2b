import assert from 'bso-tools/assert'
import update from 'bso-server/api/series/update'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'
import crypto from 'crypto'
import mongoose from 'mongoose'

let db = {series: {update: () => {}}}
let stub = sinon.stub(db.series, 'update')
stub.returns(new Promise((resolve, reject)=>{
  let err = new mongoose.Error.ValidationError()
  err.errors.title = {msg: 'required'}
  reject(err)
}))

export default async () => {
  let fn = update(db)

  let req = new MockRequest({
    method: 'patch',
    params: {id: 'asdf'},
    body: {}
  })

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 401)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({errors: {title: {msg: 'required'}}}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, {_id: 'asdf', published: false}, {})
}
