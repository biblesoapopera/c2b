export default (db) => {
  const clean = () => {
    db.revokedToken.clean()
    setTimeout(clean, 1000 * 60 * 60 * 24)
  }

  clean()
}
