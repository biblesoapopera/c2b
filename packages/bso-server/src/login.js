import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import authenticate from './authenticate'
import getUser from './db/user/getUser'

export default (app, key) => {
  app.use(bodyParser.json())

  app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (authenticate(username, password)) {
      let user = getUser(username)
      let token = jwt.sign({sub: user.id, name: user.name}, key)

      res.set('authorization', 'jwt ' + token)
      res.type('json')
      res.status(200)
      res.send({msg: 'logged in'})
    } else {
      res.status(401)
      res.send({msg: 'login fail'})
    }
  })
}
