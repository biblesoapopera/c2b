import 'regenerator'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './comp/App'
import apiFn from './api'
import xhrFn from './xhr'
import jwtFn from './jwt'
import SparkMD5 from 'spark-md5'
import cacheFn from './cache'

let jwt = jwtFn(localStorage)
let xhr = xhrFn(jwt, XMLHttpRequest)
let api = apiFn(xhr, jwt, SparkMD5, FileReader, cacheFn)

ReactDOM.render(
  <App api={api}/>,
  document.getElementById('root')
);
