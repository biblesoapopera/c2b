'use strict';

System.register('bso-client/comp/player/audioPlayer', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (objectUrl, start, end, progress) {
        var playCalled = false;
        var playing = false;
        var pauseCalled = false;
        var paused = false;

        var doneResolve = void 0;
        var doneReject = void 0;
        var donePromise = new Promise(function (resolve, reject) {
          doneResolve = resolve;
          doneReject = reject;
        });

        var audio = new Audio(objectUrl);

        if (start) audio.currentTime = start;

        if (end || progress) {
          audio.addEventListener('timeupdate', function (evt) {
            if (end && audio && audio.currentTime > end - 0.15) {
              audio.pause();
              audio = undefined; // ensure object released for gc
              doneResolve();
            } else if (progress && audio) {
              progress(audio.currentTime);
            }
          });
        }

        audio.addEventListener('ended', function (evt) {
          audio = undefined; // ensure object released for gc
          doneResolve();
        });

        audio.addEventListener('error', function (evt) {
          // TODO do something sensible with error
          console.log('audio error');
          console.log(evt);
        });

        return {
          play: function play() {
            audio.play();
          },
          pause: function pause() {
            audio.pause();
          },
          jump: function jump(to) {
            audio.currentTime = to;
          },
          kill: function kill() {
            audio.pause();
            audio = undefined;
            doneResolve();
          },
          done: donePromise
        };
      });
    }
  };
});