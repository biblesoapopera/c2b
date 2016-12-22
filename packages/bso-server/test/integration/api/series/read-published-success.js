import assert from 'bso-tools/assert'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import mongooseCleanup from 'bso-server/test/resource/mongoose-cleanup'
import testConfig from 'bso-server/test/resource/test-server-config'

let app = express()
let config = testConfig('read-published-success')

app.use('/', router(config))

export let timeout = 5000
export default async () => {

  // create some series to query against
  await config.db.series.create({
    lang: 'en',
    number: 1,
    title: 'series1',
    published: true
  })
  await config.db.series.create({
    lang: 'en',
    number: 2,
    title: 'series2',
    published: true
  })

  let pResolve
  let pReject
  let p = new Promise((resolve, reject) => {
    pResolve = resolve
    pReject = reject
  })

  request(app)
    .get('/series/en/published')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      assert.equal(2, res.body.length)
      assert.equal(1, res.body[0].number)
      assert.equal(2, res.body[1].number)
    })
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p

  await mongooseCleanup()
}
