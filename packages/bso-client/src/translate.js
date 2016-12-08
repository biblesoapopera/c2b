import store from './store/lang'

export default (lang, context, str) => {
  let strPack = store.find(lang)

  if (strPack && strPack[context] && typeof strPack[context][str] !== 'string'){
    console.log(lang,context,str, strPack[context])
  }

  if (!strPack || !strPack[context] || typeof strPack[context][str] !== 'string') return str
  return strPack[context][str]
}
