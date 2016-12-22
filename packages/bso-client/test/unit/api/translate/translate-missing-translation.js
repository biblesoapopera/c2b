import assert from 'bso-tools/assert'
import translateFn from 'bso-client/api/translate'
import sinon from 'sinon'

let stubGetStrinkPack = sinon.stub()
stubGetStrinkPack.returns({
  mycontext: {
    'my text': 'translated text'
  }
})

let translate = translateFn(stubGetStrinkPack)

export default () => {
  let result = translate('en', 'mycontext', 'my missing text')

  assert.calledOnce(stubGetStrinkPack)
  assert.calledWith(stubGetStrinkPack, 'en')

  assert.equal('my missing text', result)
}
