'use strict';

let chai = require('chai')
let sinon = require('sinon')

let assert = {}

Object.keys(chai.assert).forEach(key => {
  assert[key] = chai.assert[key]
})

Object.keys(sinon.assert).forEach(key => {
  assert[key] = sinon.assert[key]
})

module.exports = assert

