let clean = (db) => {
  db.revokedToken.clean()
  setTimeout(clean, 1000 * 60 * 60 * 24)
}

export default (db) => {
  clean(db)
}
