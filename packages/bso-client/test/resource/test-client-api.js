import apiFn from 'bso-client/api'
import xhrFn from 'bso-client/xhr'
import jwtFn from 'bso-client/jwt'
import localStorage from 'bso-client/test/resource/localStorage'
import XMLHttpRequest from 'xhr2'

XMLHttpRequest.nodejsSet({baseUrl: 'http://localhost:8088'})

let jwt = jwtFn(localStorage)
let xhr = xhrFn(jwt, XMLHttpRequest)
let api = apiFn(xhr)

export default api
