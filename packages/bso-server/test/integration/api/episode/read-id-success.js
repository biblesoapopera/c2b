import assert from 'bso-tools/assert'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import mongooseCleanup from 'bso-server/test/resource/mongoose-cleanup'
import testConfig from 'bso-server/test/resource/test-server-config'

let app = express()
let config = testConfig('read-id-success')

app.use('/', router(config))

export let timeout = 5000
export default async () => {

  // create some series to query against
  let episodeId = (await config.db.episode.create({
    lang: 'en',
    series: 1,
    title: 'my episode',
    slides: [],
    img: 'my/episode/img.jpg'
  }))._id

  let pResolve
  let pReject
  let p = new Promise((resolve, reject) => {
    pResolve = resolve
    pReject = reject
  })

  request(app)
    .get('/episode/' + episodeId)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      assert.equal(1, res.body.length)
      assert.equal(episodeId, res.body[0]._id)
    })
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p

  await mongooseCleanup()
}
