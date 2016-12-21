'use strict';

let decache = require('decache')
let System = {}
let store = {}

global.System = System

module.exports = entry => {
  if (store[entry] !== void 0) return store[entry]

  let resolve = (mid, parent) => {

    if (parent) {
      let midParts = mid.split('/')
      let parentParts = parent.split('/')
      if (parentParts.length > 1) parentParts.pop()
      let resolvedMid = []
      if (midParts[0] === '.') {
        resolvedMid = parentParts
        midParts.shift()
      } else if (midParts[0] === '..') {
        resolvedMid = parentParts
        while (midParts[0] === '..') {
          resolvedMid.pop()
          midParts.shift()
        }
      }

      mid = resolvedMid.concat(midParts).join('/')
    }

    if (mid === 'react-dom') return require.resolve('bso-client/lib/react-dom')
    if (mid === 'react') return require.resolve('bso-client/lib/react')
    if (mid === 'regenerator') return require.resolve('bso-client/lib/regenerator')

    let prefix = mid.split('-')[0]
    if (prefix === 'bso' || prefix === 'up') mid = mid.replace('/', '/lib/')

    return require.resolve(mid)
  }

  store[entry] = [
    resolve('up-system/client'),
    require.resolve('bso-client/lib/regenerator')
  ]

  System.register = (name, deps) => {
    let file = resolve(name)

    if (store[entry].indexOf(file) === -1) store[entry].push(file)

    deps.forEach(dep => {
      file = resolve(dep, name)
      if (store[entry].indexOf(file) === -1) store[entry].push(file)
      require(file)
    })
  }

  require(resolve(entry))

  store[entry].forEach(file => decache(file))
  return store[entry]
}
