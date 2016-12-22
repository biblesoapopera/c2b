import userFn from './api/user'
import langFn from './api/lang'
import translateFn from './api/translate'
import audioFn from './api/audio'

export default (xhr, jwt, SparkMD5, FileReader) => {
  let user = userFn(xhr, jwt)
  let lang = langFn(xhr)

  return {
    user: user,
    lang: lang,
    translate: translateFn(lang.readSync),
    audio: audioFn(xhr, SparkMD5, FileReader)
  }
}
