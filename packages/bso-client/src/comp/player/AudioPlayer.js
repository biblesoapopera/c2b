export default (objectUrl, start, end) => {
  let doneResolve
  let doneReject
  let donePromise = new Promise((resolve,reject) => {
    doneResolve = resolve
    doneReject = reject
  })

  let audio = new Audio(objectUrl)

  if (start) audio.currentTime = start

  if (end) {
    audio.addEventListener('timeupdate', evt => {
      if (audio && audio.currentTime > end - 0.15) {
        audio.pause()
        audio = undefined // ensure object released for gc
        doneResolve()
      }
    })
  } else {
    audio.addEventListener('ended', evt => {
      audio = undefined // ensure object released for gc
      doneResolve()
    })
  }

  return {
    play: () => {
      audio.play()
    },
    pause: () => {
      audio.pause()
    },
    kill: () => {
      audio.pause()
      audio = undefined
      doneResolve()
    },
    done: donePromise
  }
}
