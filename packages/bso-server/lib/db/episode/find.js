"use strict";

System.register("bso-server/db/episode/find", [], function (_export, _context) {
  "use strict";

  var store;
  return {
    setters: [],
    execute: function () {
      store = [{
        title: "Episode 1",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode1.png"
      }, {
        title: "Episode 2",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode2.png"
      }, {
        title: "Episode 3",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode3.png"
      }, {
        title: "Episode 4",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode4.png"
      }, {
        title: "Episode 5",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode5.png"
      }, {
        title: "Episode 6",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode6.png"
      }, {
        title: "Episode 7",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode7.png"
      }, {
        title: "Episode 8",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode8.png"
      }, {
        title: "Episode 9",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode9.png"
      }, {
        title: "Episode 10",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "img/series1/episode10.png"
      }];

      _export("default", function (url) {
        return function (id) {
          return store[id];
        };
      });
    }
  };
});