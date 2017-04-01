export default (objectUrl, start, end, progress) => {
  let playCalled = false
  let playing = false
  let pauseCalled = false
  let paused = false

  let doneResolve
  let doneReject
  let donePromise = new Promise((resolve,reject) => {
    doneResolve = resolve
    doneReject = reject
  })

  let audio = new Audio(objectUrl)

  if (start) audio.currentTime = start

  if (end || progress) {
    audio.addEventListener('timeupdate', evt => {
      if (end && audio && audio.currentTime > end - 0.15) {
        audio.pause()
        audio = undefined // ensure object released for gc
        doneResolve()
      } else if (progress && audio) {
        progress(audio.currentTime)
      }
    })
  }

  audio.addEventListener('ended', evt => {
    audio = undefined // ensure object released for gc
    doneResolve()
  })

  audio.addEventListener('error', evt => {
    // TODO do something sensible with error
    console.log('audio error')
    console.log(evt)
  })

  return {
    play: () => {
      audio.play()
    },
    pause: () => {
      audio.pause()
    },
    jump: to => {
      audio.currentTime = to
    },
    kill: () => {
      audio.pause()
      audio = undefined
      doneResolve()
    },
    done: donePromise
  }
}
