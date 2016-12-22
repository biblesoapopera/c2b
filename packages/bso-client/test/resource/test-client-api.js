import apiFn from 'bso-client/api'
import xhrFn from 'bso-client/xhr'
import jwtFn from 'bso-client/jwt'
import localStorage from 'bso-client/test/resource/localStorage'
import XMLHttpRequest from 'xhr2'
import SparkMD5 from 'spark-md5'
import FileAPI from 'file-api'

XMLHttpRequest.nodejsSet({baseUrl: 'http://localhost:8088'})

let jwt = jwtFn(localStorage)
let xhr = xhrFn(jwt, XMLHttpRequest)
let api = apiFn(xhr, jwt, SparkMD5, FileAPI.FileReader)

export default api
