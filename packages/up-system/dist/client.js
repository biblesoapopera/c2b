'use strict';

var System = { _store: {} };

System.register = function (mid, deps, fn) {
  System._store[mid] = {
    deps: deps,
    fn: fn,
    exportObj: {},
    executed: false
  };
};

System.import = function (mid) {
  if (System._store[mid] && System._store[mid].executed) return System._store[mid].exportObj;

  var deps = System._store[mid].deps.map(function (dep) {
    var depParts = dep.split('/');
    var midParts = mid.split('/');
    if (midParts.length > 1) midParts.pop();
    var depMid = [];
    if (depParts[0] === '.') {
      depMid = midParts;
      depParts.shift();
    } else if (depParts[0] === '..') {
      depMid = midParts;
      while (depParts[0] === '..') {
        depMid.pop();
        depParts.shift();
      }
    }

    dep = depMid.concat(depParts);
    dep = dep.join('/');

    try {
      return System.import(dep);
    } catch (err) {
      throw new Error('This error occured while importing dependency ' + dep + ' for ' + mid + ': \n' + err);
    }
  });

  var obj = System._store[mid].fn(function (name, value) {
    System._store[mid].exportObj[name] = value;
  });

  obj.setters.forEach(function (setter, idx) {
    setter(deps[idx]);
  });

  obj.execute();
  System._store[mid].executed = true;

  return System._store[mid].exportObj;
};