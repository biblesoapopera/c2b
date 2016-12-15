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
let db = dbFn('mongodb://localhost:27017/test-api-series-read-published-success')
let audioDir = path.join(__dirname, '..', '..', '..', 'temp')

app.use('/', router({
  key:key,
  rbac: rbac,
  db: db,
  audioDir: audioDir
}))

export let timeout = 5000
export default async () => {

  // create some series to query against
  await db.series.create({
    lang: 'en',
    number: 1,
    title: 'series1',
    published: true
  })
  await db.series.create({
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

  // cleanup
  await new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase(err => {
      if (err) reject(err)
      else resolve()
    })
  })
  mongoose.connection.close()
}
