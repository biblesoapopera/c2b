import 'bso-model/RevokedToken'
import mongoose from 'mongoose'

let Model = mongoose.model('RevokedToken')

export default {
  exists: token => Model.count({token: token}).exec(),
  create: (token, exp) => {
    let model = new Model({token: token, exp: exp})
    return model.save()
  },
  clean: () => {
    let now = Math.floor(Date.now() / 1000)
    return mongoose.model('RevokedToken').remove({exp: {$lt : now}}).exec()
  }
}
