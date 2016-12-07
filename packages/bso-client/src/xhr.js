export default asset => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', asset, true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject('Error fetching asset ' + asset + '. Status: ' + xhr.status)
        }
      }
    }
    xhr.send()
  })
}
