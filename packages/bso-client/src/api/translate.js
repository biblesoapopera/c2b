export default getStringPack => {
  return (lang, context, str) => {
    let strPack = getStringPack(lang)

    if (strPack && (!strPack[context] || typeof strPack[context][str] !== 'string')){
      // TODO do something better with this warning
      console.log('Missing translation:', lang, context, str)
    }

    if (!strPack || !strPack[context] || typeof strPack[context][str] !== 'string') {
      return str
    }

    return strPack[context][str]
  }
}
