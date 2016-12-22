import userFn from './api/user'
import langFn from './api/lang'
import translateFn from './api/translate'

export default (xhr, jwt) => {
  let user = userFn(xhr, jwt)
  let lang = langFn(xhr)

  return {
    user: user,
    lang: lang,
    translate: translateFn(lang.readSync)
  }
}
