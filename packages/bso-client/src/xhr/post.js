export default (jwt, XMLHttpRequest) => {
  return (url, data) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

      let token = jwt.get()
      if (token) xhr.setRequestHeader('authorization', 'jwt ' + token)

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return

        if (xhr.status == 200) {
          let authHeader = xhr.getResponseHeader('authorization')
          if (authHeader && authHeader.slice(0, 3) === 'jwt') {
            jwt.set(authHeader.slice(4))
          }
        }

        resolve({
          status: xhr.status,
          body: JSON.parse(xhr.responseText)
        })
      }
      xhr.send(JSON.stringify(data))
    })
  }
}
