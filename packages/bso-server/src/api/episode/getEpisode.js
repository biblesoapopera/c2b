import authorize from '../../authorize'
import authenticate from '../../authenticate'

export default (app, key, rbac, db) => {
  app.get('/episode/:lang/:sid/:eid', authenticate(key, db), authorize(rbac, 'read', 'episode'), (req, res) => {
    let episode = db.episode.find(req.params.lang, req.params.sid, req.params.eid)
    res.type('json')
    res.status(200)
    res.send(episode)
  })
}
