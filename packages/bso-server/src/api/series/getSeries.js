import authorize from '../../authorize'
import authenticate from '../../authenticate'

export default (app, key, rbac, db) => {
  app.get('/series/:lang', authenticate(key, db), authorize(rbac, 'read', 'series'), (req, res) => {
    let series = db.series.find(req.params.lang)
    res.type('json')
    res.status(200)
    res.send(series)
  })
}
