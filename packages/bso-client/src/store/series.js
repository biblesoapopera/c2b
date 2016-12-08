let store = {
  "en": [
    {
      title: 'Series 1',
      summary: 'The first Cursed to Bless series.',
      episodes: [
        {
          id: 1,
          title: "Episode 1",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode1.png"
        },
        {
          id: 2,
          title: "Episode 2",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode2.png"
        },
        {
          id: 3,
          title: "Episode 3",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode3.png"
        },
        {
          id: 4,
          title: "Episode 4",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode4.png"
        },
        {
          id: 5,
          title: "Episode 5",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode5.png"
        },
        {
          id: 6,
          title: "Episode 6",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode6.png"
        },
        {
          id: 7,
          title: "Episode 7",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode7.png"
        },
        {
          id: 8,
          title: "Episode 8",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode8.png"
        },
        {
          id: 9,
          title: "Episode 9",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode9.png"
        },
        {
          id: 10,
          title: "Episode 10",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series1/episode10.png"
        }
      ]
    },
    {
      title: 'Series 2',
      summary: 'The second Cursed to Bless series.',
      episodes: [
        {
          id: 11,
          title: "Episode 1",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode1.png"
        },
        {
          id: 12,
          title: "Episode 2",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode2.png"
        },
        {
          id: 13,
          title: "Episode 3",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode3.png"
        },
        {
          id: 14,
          title: "Episode 4",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode4.png"
        },
        {
          id: 15,
          title: "Episode 5",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode5.png"
        },
        {
          id: 16,
          title: "Episode 6",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode6.png"
        },
        {
          id: 17,
          title: "Episode 7",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode7.png"
        },
        {
          id: 18,
          title: "Episode 8",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode8.png"
        },
        {
          id: 19,
          title: "Episode 9",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode9.png"
        },
        {
          id: 20,
          title: "Episode 10",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img: "img/series2/episode10.png"
        }
      ]
    }
  ],
  "es": [],
  "mizo": [],
  "my": []
}

export default {
  find: lang => {
    return store[lang]
  }
}
