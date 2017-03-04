import mongoose from 'mongoose'
import dbFn from 'bso-server/db'
import hash from 'password-hash'

mongoose.Promise = Promise

let db = dbFn('mongodb://localhost:27017/c2b')

export default async () => {
  let result
  try {
/*
    let result = await db.user.create({
      username: 'marty@marty.com',
      password: hash.generate('marty'),
      name: 'Marty Olmos',
      roles: ['editor'],
      loginVersion: 1
    })
*/

    result = await db.episode.create({
      "lang": "en",
      "series": 0,
      "episode": 0,
      "title": "Demo Episode",
      "summary": "This episode contains the pilot audio drama with accompanying discussion questions.",
      "img": "abc123",
      "primaryAudio": "en_series1_episode1",
      "slides": [
        {
          "text": {
            "text": "<p>Hello. Welcome to this drama lesson. Today we are going to learn about Abraham and how he trusted God's word.</p>",
            "audio": {
              file: "test_audio1",
              start: 0,
              end: 3
            }
          }
        },
        {
          "text": {
            "text": "<p>Remember when God asked Abraham to sacrifice his son Isaac? Read it now in Genesis 22.</p><p>Click next when you're ready.</p>",
            "audio": {
              file: "test_audio2",
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
          "listen": {
            "text": "Listen to Paul's story.",
            "audio": {
              "file": "en_series1_episode1",
              "start": 0,
              "end": 494
            }
          }
        },
        {
          "text": {
            "text": "<p>Paul is in trouble again - what will he do?</p><p>Answer these questions to find out.</p>"
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
      ]
    })

  } catch (err) {
    console.log(err)
    console.log(JSON.stringify(err.errors, null, '  '))
  }
  console.log(result)
  console.log('done')
}
