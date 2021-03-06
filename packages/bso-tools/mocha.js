'use strict';

require('regenerator-runtime/runtime') // this is needed for bso-client lib which is transpiled without this runtime
require('up-system')
let path = require('path')
let glob = require('glob')
let argv = require('yargs').argv

module.exports = pkg => {

  let testDir = path.join(__dirname, '../', pkg, 'test')

  require('babel-register')({
    presets: ['es2015', 'babel-preset-stage-3', 'react'],
    plugins: [
      'babel-plugin-transform-runtime',
      'transform-es2015-modules-systemjs',
      'transform-function-bind'
    ],
    moduleIds: true,
    sourceRoot: testDir,
    moduleRoot: pkg + '/test',
    only: testDir + '/**/*.js'
  })

  let ret = {}
  ret[pkg] = {}

  let globDef
  if (argv.test) {
    globDef = path.join(__dirname, '..') + '/' + argv.test
  } else {
    globDef = testDir + '/**/*.js'
  }

  glob.sync(globDef, {nodir: true, ignore: testDir + '/resource/**.*'}).forEach(file => {
    let name = path.relative(testDir, file).replace(/.js$/, '').replace(/\\/g, '/')

    ret[pkg][name] = function(done) {
      System.import(pkg + '/test/' + name)
        .then(mod => {
          if (mod.timeout) this.timeout(mod.timeout)
          try {
            let ret = mod.default(done)
            if (ret !== void 0 && ret.then) {
              ret.then(done).catch(done)
              return
            }
          } catch (err) {
            done(err)
            return
          }
          done()
        })
        .catch(done)
    }
  })

  return ret
}
