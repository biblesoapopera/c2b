import xhr from '../xhr'
import store from './store'

export default locale => {
  return new Promise(async (resolve, reject) => {
    if (!store[locale].loaded) {
      let data = await xhr('i18n/locale/' + locale + '.json')
      data.name = store[locale].name
      data.loaded = true
      store[locale] = data
      resolve()
    } else {
      resolve()
    }
  })
}
