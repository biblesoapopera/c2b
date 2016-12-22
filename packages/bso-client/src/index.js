import 'regenerator'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './comp/App'
import apiFn from './api'
import xhrFn from './xhr'
import jwtFn from './jwt'

let jwt = jwtFn(localStorage)
let xhr = xhrFn(jwt, XMLHttpRequest)
let api = apiFn(xhr)

ReactDOM.render(
  <App api={api}/>,
  document.getElementById('root')
);
