'use strict';

let concat = require('gulp-concat')
let uglify = require('gulp-uglify')
let minifyHTML = require('gulp-minify-html')
let gulp = require('gulp')
let gulpif = require('gulp-if')
let babel = require('gulp-babel')
let argv = require('yargs').argv
let deps  = require('./packages/bso-tools/deps')
let gap = require('gulp-append-prepend')
let livereload = require('gulp-livereload')
let less = require('gulp-less')
let path = require('path')
let rename = require('gulp-rename')
let del = require('del')
let mocha = require('gulp-mocha')
let eslint = require('gulp-eslint')
let standard = require('gulp-standard')
let through = require('through2').obj
let checker = require('istanbul-threshold-checker')
let istanbul = require('istanbul')

let buildType = 'dev';
if (argv.dist) buildType = 'dist'

let compile = pkg => {
  return gulp.src('packages/' + pkg + '/src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'babel-preset-stage-3', 'react'],
      plugins: ['babel-plugin-transform-runtime', 'transform-es2015-modules-systemjs', 'transform-function-bind'],
      moduleIds: true,
      sourceRoot: 'src',
      moduleRoot: pkg,
      getModuleId: mid => {
        let parts = mid.split('/')
        if (parts.pop() === 'index') mid = parts.join('/')
        return mid
      }
    }))
    .pipe(gulp.dest('packages/' + pkg + '/lib'))
}

let test = pkg => {
  return gulp.src('packages/' + pkg + '/mocha.js')
    .pipe(mocha({
      ui: 'exports',
      reporter: 'spec'
    }))
}

let complexity = pkg => {
  return gulp.src(['packages/' + pkg + '/src/**/*.js', 'packages/' + pkg + '/test/**/*.js'])
    .pipe(eslint({
      rules: {
        complexity: [2, 14],
        'max-depth': [2, 4],
        'max-len': [2, 120, 4],
        'max-nested-callbacks': [2, 4],
        'max-params': [2, 4],
        'max-statements': [2, 20]
      },
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module'
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

let lint = pkg => {
  return gulp.src(['packages/' + pkg + '/src/**/*.js', 'packages/' + pkg + '/test/**/*.js'])
    .pipe(standard({
      fix: true
    }))
    .pipe(standard.reporter('default', {
      breakOnError: true,
      breakOnWarning: true,
      quiet: true
    }))
}

// bso-client
gulp.task('clean-bso-client', () => {
  return del([
    'packages/bso-client/lib/**/*',
    'packages/bso-client/dist/**/*'
  ])
})
gulp.task('compile-bso-client-vendor', () => {
  gulp.src('node_modules/regenerator-runtime/runtime.js')
    .pipe(gap.prependText("System.register('regenerator', [], function (_export, _context) {return {setters: [], execute: function () {"))
    .pipe(gap.appendText("_export('default', window.regenerator)}}})"))
    .pipe(rename('regenerator.js'))
    .pipe(gulp.dest('packages/bso-client/lib'))

  gulp.src('node_modules/react-dom/dist/react-dom.js')
    .pipe(gap.prependText("System.register('react-dom', [], function (_export, _context) {return {setters: [], execute: function () {"))
    .pipe(gap.appendText("_export('default', window.ReactDOM)}}})"))
    .pipe(gulp.dest('packages/bso-client/lib'))

  return gulp.src('node_modules/react/dist/react.js')
    .pipe(gap.prependText("System.register('react', [], function (_export, _context) {return {setters: [], execute: function () {"))
    .pipe(gap.appendText("_export('default', window.React)}}})"))
    .pipe(gulp.dest('packages/bso-client/lib'))
})
gulp.task('compile-bso-client-babel', () => {
  return gulp.src('packages/bso-client/src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'babel-preset-stage-3', 'react'],
      plugins: [
        'transform-es2015-modules-systemjs',
        'transform-function-bind',
        'transform-class-properties'
      ],
      moduleIds: true,
      sourceRoot: 'src',
      moduleRoot: 'bso-client',
      getModuleId: mid => {
        let parts = mid.split('/')
        if (parts.pop() === 'index') mid = parts.join('/')
        return mid
      }
    }))
    .pipe(gulp.dest('packages/bso-client/lib'))
})
gulp.task('compile-bso-client-less', function() {
  return gulp.src('packages/bso-client/src/less/index.less')
    .pipe(gulpif(buildType === 'dist', less({paths: [path.join(__dirname, 'packages', 'bso-client', 'src', 'less')], compress: true})))
    .pipe(gulpif(buildType === 'dev', less({paths: [path.join(__dirname, 'packages', 'bso-client', 'src', 'less')], compress: false})))
    .pipe(concat('bso-client.min.css'))
    .pipe(gulp.dest('packages/bso-client/dist'))
    .pipe(livereload())
});
gulp.task('compile-bso-client-js', ['compile-bso-client-vendor', 'compile-bso-client-babel'], () => {
  return gulp.src(deps('bso-client'))
    .pipe(concat('bso-client.min.js'))
    .pipe(gap.appendText("System.import('bso-client')"))
    .pipe(gulpif(buildType === 'dist', uglify()))
    .pipe(gulp.dest('packages/bso-client/dist'))
    .pipe(livereload())
})
gulp.task('compile-bso-client-html', () => {
  return gulp.src('packages/bso-client/src/**/*.html')
    .pipe(gulpif(buildType === 'dist', minifyHTML({})))
    .pipe(gulp.dest('packages/bso-client/dist'))
    .pipe(livereload())
})
gulp.task('compile-bso-client-img', () => {
  return gulp.src(['packages/bso-client/src/**/*.{jpg,png}', '!packages/bso-client/src/high res assets/**/*.*'])
    .pipe(gulp.dest('packages/bso-client/dist'))
    .pipe(livereload())
})
gulp.task('compile-bso-client-json', () => {
  return gulp.src('packages/bso-client/src/**/*.json')
    .pipe(gulp.dest('packages/bso-client/dist'))
    .pipe(livereload())
})
gulp.task('compile-bso-client', [
  'compile-bso-client-js',
  'compile-bso-client-html',
  'compile-bso-client-less',
  'compile-bso-client-img',
  'compile-bso-client-json'
])
gulp.task('test-bso-client', ['compile-bso-client'], () => test('bso-client'))

// up-system
gulp.task('clean-up-system', () => {
  return del([
    'packages/up-system/lib/**/*',
    'packages/up-system/dist/**/*'
  ])
})
gulp.task('compile-up-system', () => {
  gulp.src('packages/up-system/src/*.js')
    .pipe(babel({
      presets: ['es2015', 'babel-preset-stage-3', 'react'],
      plugins: ['babel-plugin-transform-runtime']
    }))
    .pipe(gulp.dest('packages/up-system/lib'))

  return gulp.src('packages/up-system/src/client.js')
    .pipe(babel({
      presets: ['es2015', 'babel-preset-stage-3', 'react'],
      plugins: ['babel-plugin-transform-runtime']
    }))
    .pipe(gulp.dest('packages/up-system/dist'))
})

// bso-server
gulp.task('clean-bso-server', () => {
  return del([
    'packages/bso-server/lib/**/*',
    'packages/bso-server/instrumented-lib',
    'packages/bso-server/coverage',
    'packages/bso-server/test/temp/**/*'
  ])
})
gulp.task('compile-bso-server', () => compile('bso-server'))
gulp.task('test-bso-server', ['compile-bso-server'], () => test('bso-server'))
gulp.task('complexity-bso-server', ['test-bso-server'], () => complexity('bso-server'))
gulp.task('lint-bso-server', ['complexity-bso-server'], () => lint('bso-server'))

gulp.task('instrument-bso-server', () => {
  return gulp.src('packages/bso-server/src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'babel-preset-stage-3', 'react'],
      plugins: ['istanbul', 'babel-plugin-transform-runtime', 'transform-es2015-modules-systemjs', 'transform-function-bind'],
      moduleIds: true,
      sourceRoot: 'src',
      moduleRoot: 'bso-server',
      getModuleId: mid => {
        let parts = mid.split('/')
        if (parts.pop() === 'index') mid = parts.join('/')
        return mid
      }
    }))
    .pipe(gulp.dest('packages/bso-server/instrumented-lib'))
})

gulp.task('coverage-bso-server', ['instrument-bso-server'], (done) => {
  require('up-system')
  let resolve = System.resolve
  System.resolve = mid => {
    let m = resolve(mid)
    return m.replace('bso-server/lib', 'bso-server/instrumented-lib')
  }

  let collector = new istanbul.Collector()
  let reporter = new istanbul.Reporter(false, './packages/bso-server/coverage')
  reporter.addAll(['text-summary', 'html'])

  let results

  gulp.src('packages/bso-server/mocha.js')
    .pipe(mocha({
      ui: 'exports',
      reporter: 'progress'
    }))
    .on('error', err => done(err))
    .on('end', () => {
      collector.add(global.__coverage__);

      gulp.src('packages/bso-server/instrumented-lib/**/*.js')
      .pipe(through(function (file, enc, cb) {
        let instrumentedSrc = file.contents.toString()
        try {
          let start = /coverageData = {/.exec(instrumentedSrc)
          let end = /_coverageSchema: '.+'/.exec(instrumentedSrc)
          if (start && end) {
            let coverageData
            eval(instrumentedSrc.slice(start.index, end.index + end[0].length) + '}')
            let coverageObj = {}
            coverageObj[coverageData.path] = coverageData
            collector.add(coverageObj)
          }
        } catch (err) {cb(err)}
        return cb(null, file)
      }))
      .on('error', err => done(err))
      .on('data', () => {})
      .on('end', () => {
        reporter.write(collector, true, () => {})

        let thresholds = {
          global: {
            statements: 100,
            branches: 90,
            lines: 90,
            functions: -2
          },
          each: {
            statements: 100,
            branches: -1,
            lines: 80,
            functions: -1
          }
        }

        results = checker.checkFailures(thresholds, collector.getFinalCoverage())

        if (results.some(type => (type.global && type.global.failed) || (type.each && type.each.failed))){
          done(new Error('Coverage failed: \n' + JSON.stringify(results, null, '  ')))
          return
        }

        done()
      })
    })
})

// up-fs
gulp.task('clean-up-fs', () => {
  return del([
    'packages/up-fs/lib/**/*'
  ])
})
gulp.task('compile-up-fs', () => compile('up-fs'))

// bso-model
gulp.task('clean-bso-model', () => {
  return del([
    'packages/bso-model/lib/**/*'
  ])
})
gulp.task('compile-bso-model', () => compile('bso-model'))
gulp.task('test-bso-model', ['compile-bso-model'], () => test('bso-model'))

// summary tasks
gulp.task('clean', [
  'clean-bso-model',
  'clean-bso-server',
  'clean-bso-client',
  'clean-up-fs',
  'clean-up-system'
])

gulp.task('compile', [
  'compile-bso-model',
  'compile-bso-server',
  'compile-bso-client',
  'compile-up-fs',
  'compile-up-system'
])

gulp.task('test', [
  'test-bso-server',
  'test-bso-client'
])

gulp.task('default', ['compile'])

gulp.task('watch', ['default'], () => {
  livereload.listen()

  gulp.watch('packages/bso-model/src/**/*.js', ['test-bso-model'])
  gulp.watch('packages/bso-model/test/**/*.js', ['test-bso-model'])

  gulp.watch('packages/bso-server/src/**/*.js', ['test-bso-server'])
  gulp.watch([
    'packages/bso-server/test/*.js',
    'packages/bso-server/test/unit/**/*.js',
    'packages/bso-server/test/integration/**/*.js',
    '!packages/bso-server/test/resource/**/*.*'
  ], ['test-bso-server'])

  gulp.watch('packages/bso-client/src/**/*.js', ['compile-bso-client-js'])
  gulp.watch('packages/bso-client/src/**/*.html', ['compile-bso-client-html'])
  gulp.watch('packages/bso-client/src/less/**/*.less', ['compile-bso-client-less'])
  gulp.watch('packages/bso-client/src/i18n/**/*.json', ['compile-bso-client-json'])
  gulp.watch([
    'packages/bso-client/test/*.js',
    'packages/bso-client/test/unit/**/*.js',
    'packages/bso-client/test/integration/**/*.js',
    '!packages/bso-client/test/resource/**/*.*'
  ], ['test-bso-client'])

  gulp.watch('packages/up-fs/src/**/*.js', ['compile-up-fs'])
  gulp.watch('packages/up-system/src/**/*.js', ['compile-up-system'])
})

