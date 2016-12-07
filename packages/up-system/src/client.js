let System = {_store: {}}

System.register = (mid, deps, fn) => {
  System._store[mid] = {
    deps: deps,
    fn: fn,
    exportObj: {},
    executed: false
  }
}

System.import = mid => {
  if (System._store[mid] && System._store[mid].executed) return System._store[mid].exportObj

  let deps = System._store[mid].deps.map(dep => {
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
      return System.import(dep)
    } catch (err) {
      throw new Error('This error occured while importing dependency ' + dep + ' for ' + mid + ': \n' + err)
    }
  })

  let obj = System._store[mid].fn((name, value) => {
    System._store[mid].exportObj[name] = value
  })

  obj.setters.forEach((setter, idx) => {
    setter(deps[idx])
  })

  obj.execute()
  System._store[mid].executed = true

  return System._store[mid].exportObj
}

