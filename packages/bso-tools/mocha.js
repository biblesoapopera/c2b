'use strict';

require('up-system')
let path = require('path')
let glob = require('glob')

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
    getModuleId: mid => {
      let parts = mid.split('/')
      if (parts.pop() === 'index') mid = parts.join('/')
      return mid
    },
    only: testDir
  })

  let ret = {}
  ret[pkg] = {}

  glob.sync(testDir + '/**/*.js', {nodir: true}).forEach(file => {
    let name = path.relative(testDir, file).replace(/.js$/, '')

    ret[pkg][name] = done => {
      System.import(pkg + '/test/' + name)
        .then(mod => {
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
