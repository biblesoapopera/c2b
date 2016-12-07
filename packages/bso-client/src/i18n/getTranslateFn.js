import store from './store'

export default (locale, context) => {
  return str => {
    if (!store[locale].loaded || !store[locale][context] || typeof store[locale][context][str] !== 'string') return str
    return store[locale][context][str]
  }
}
