import React from 'react'
import ReactDOM from 'react-dom'
import App from './comp/App'
import api from './api'
import xhr from './xhr'
import jwt from './jwt'

ReactDOM.render(
  <App api={api(xhr(jwt))}/>,
  document.getElementById('root')
);
