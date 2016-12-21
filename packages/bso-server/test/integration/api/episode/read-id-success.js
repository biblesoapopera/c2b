import assert from 'bso-tools/assert'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import dbFn from 'bso-server/db'
import rbac from 'bso-server/rbac'
import path from 'path'
import mongoose from 'mongoose'

let app = express()
let key = 'testing testing'
let db = dbFn('mongodb://localhost:27020/test-api-episode-read-id-success')
let audioData = path.join(__dirname, '..', '..', '..', 'temp')

app.use('/', router({
  key:key,
  rbac: rbac,
  db: db,
  audioData: audioData
}))

export let timeout = 5000
export default async () => {

  // create some series to query against
  let episodeId = (await db.episode.create({
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

  // cleanup
  await new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase(err => {
      if (err) reject(err)
      else resolve()
    })
  })
  mongoose.connection.close()
}
