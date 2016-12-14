import assert from 'bso-tools/assert'
import deleteEpisode from 'bso-server/api/episode/delete'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {episode: {delete: () => {}}}
let stub = sinon.stub(db.episode, 'delete')
stub.returns(new Promise((resolve, reject)=>reject(new Error())))

export default async () => {
  let fn = deleteEpisode(db)

  let req = new MockRequest({
    method: 'delete',
    params: {id: 'asdf'}
  })

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'database error'}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, 'asdf')
}
