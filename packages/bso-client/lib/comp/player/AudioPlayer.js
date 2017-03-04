'use strict';

System.register('bso-client/comp/player/audioPlayer', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (objectUrl, start, end) {
        var doneResolve = void 0;
        var doneReject = void 0;
        var donePromise = new Promise(function (resolve, reject) {
          doneResolve = resolve;
          doneReject = reject;
        });

        var audio = new Audio(objectUrl);

        if (start) audio.currentTime = start;

        if (end) {
          audio.addEventListener('timeupdate', function (evt) {
            if (audio && audio.currentTime > end - 0.15) {
              audio.pause();
              audio = undefined; // ensure object released for gc
              doneResolve();
            }
          });
        } else {
          audio.addEventListener('ended', function (evt) {
            audio = undefined; // ensure object released for gc
            doneResolve();
          });
        }

        return {
          play: function play() {
            audio.play();
          },
          pause: function pause() {
            audio.pause();
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