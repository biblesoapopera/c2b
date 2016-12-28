import mongoose from 'mongoose'
import dbFn from 'bso-server/db'

mongoose.Promise = Promise

let db = dbFn('mongodb://localhost:27017/c2b')

  export default async () => {

    try {

let result = await db.episode.create({
  "lang": "en",
  "series": 0,
  "title": "Demo Episode",
  "subtitle": "Learn the whole Bible. Find Jesus in every story.",
  "summary": "This episode contains the pilot audio drama with accompanying discussion questions.",
  "img": "abc123",
  "audio": [
  ],
  "slides": [
    {
      "text": {
        "text": "<p>Hello. Welcome to this drama lesson. Today we are going to learn about Abraham and how he trusted God's word.</p>",
        "audio": {
          file: "abc123",
          start: 0,
          end: 10
        }
      }
    },
    {
      "text": {
        "text": "<p>Remember when God asked Abraham to sacrifice his son Isaac? Read it now in Genesis 22.</p><p>Click next when you're ready.</p>",
        "audio": {
          file: "abc123",
          start: 0,
          end: 10
        }
      }
    },
    {
      "slider": {
        "question": "Why do you think God asked Abraham to sacrifice Isaac?",
        "answers": [
          {
            "value": "To check Abraham - perhaps he had disobeyed God",
            "score": 100
          },
          {
            "value": "To show Abraham what God was like, and teach him about resurrection",
            "score": 0
          }
        ],
        "completeWhen": "always"
      }
    },
    {
      "pick": {
        "question": "What did Paul’s uncle give him as a gift?",
        "answers": [
          {
            "value": "TV",
            "score": 100,
            "feedback": "Yes, Paul's uncle gave him a TV"
          },
          {
            "value": "phone",
            "score": 0,
            "feedback": "No, Paul's uncle didn't give him a phone"
          },
          {
            "value": "football",
            "score": 0,
            "feedback": "No, Paul's uncle didn't gave him a football"
          }
        ],
        "feedback": {
          "incorrect": "Please try again",
          "complete": "Good stuff"
        },
        "completeWhen": "correct"
      }
    }

  ]})
    } catch (err) {
      console.log(err)
      console.log(JSON.stringify(err.errors, null, '  '))
    }
console.log(result)
console.log('done')
  }
