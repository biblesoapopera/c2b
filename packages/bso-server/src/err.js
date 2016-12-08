export default (app) => {
  app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500)
    res.send('Internal server error')
  })
}
