import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

export default (app, key, db) => {
  app.post('/login', bodyParser.json(), (req, res) => {
    let username = req.body.username
    let password = req.body.password

    let user = db.user.find(username)

    if (!user || user.password !== req.body.password) {
      res.status(401)
      res.send({msg: 'login fail'})
    } else {
      let token = jwt.sign({sub: user.username, name: user.name}, key)
      res.set('authorization', 'jwt ' + token)
      res.type('json')
      res.status(200)
      res.send({msg: 'logged in'})
    }
  })
}
