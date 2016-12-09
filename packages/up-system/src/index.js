(() => {
  let System = {}

  let store = {a: 1}

  System.resolve = mid => {
    let parts = mid.split('/')
    if (parts.length > 0 && parts[1] === 'test') return mid

    let prefix = mid.split('-')[0]
    if (prefix === 'bso' || prefix === 'up') return mid.replace('/', '/lib/')
    return mid
  }

  let requireMid = mid => require(System.resolve(mid))

  System.register = (mid, deps, fn) => {
    store[mid] = {
      deps: deps,
      fn: fn,
      exportObj: {},
      executed: false
    }
  }

  System.import = async mid => {
    if (!store[mid]) {
      let mod = requireMid(mid)

      if (mod.__esModule) {
        store[mid] = {
          deps: [],
          exportObj: mod,
          executed: true
        }
        return store[mid].exportObj
      } else if (!store[mid]) {
        store[mid] = {
          deps: [],
          exportObj: {default: mod},
          executed: true
        }
        return store[mid].exportObj
      }
    } else if (store[mid].executed) {
      return store[mid].exportObj
    }

    let deps = await Promise.all(store[mid].deps.map(async dep => {
      let depParts = dep.split('/')
      let midParts = mid.split('/')
      if (midParts.length > 1) midParts.pop()
      let depMid = []
      if (depParts[0] === '.') {
        depMid = midParts
        depParts.shift()
      } else if (depParts[0] === '..') {
        depMid = midParts
        while (depParts[0] === '..') {
          depMid.pop()
          depParts.shift()
        }
      }

      dep = depMid.concat(depParts)
      dep = dep.join('/')

      try {
        return await System.import(dep)
      } catch (err) {
        throw new Error('This error occured while importing dependencies for ' + mid + ': \n' + err.stack)
      }
    }))

    let obj = store[mid].fn((name, value) => {
      store[mid].exportObj[name] = value
    })

    obj.setters.forEach((setter, idx) => {
      setter(deps[idx])
    })

    obj.execute()
    store[mid].executed = true

    return store[mid].exportObj
  }

  global.System = System
})()
