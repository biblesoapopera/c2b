import 'regenerator'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './comp/App'
import apiFn from './api'
import xhrFn from './xhr'
import jwtFn from './jwt'
import SparkMD5 from 'spark-md5'

let jwt = jwtFn(localStorage)
let xhr = xhrFn(jwt, XMLHttpRequest)
let api = apiFn(xhr, SparkMD5, FileReader)

ReactDOM.render(
  <App api={api}/>,
  document.getElementById('root')
);
