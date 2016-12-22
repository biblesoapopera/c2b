import express from 'express'

export default (cfg, router) => {
  router.use('/lang', express.static(cfg.langData))
}
