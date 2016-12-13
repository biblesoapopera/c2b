import 'bso-model/User'
import mongoose from 'mongoose'

export default {
  find: username => mongoose.model('User').findOne({username: username}).exec(),
  create: (userObj) => {
    let Model = mongoose.model('User')
    let model = new Model(userObj)
    return model.save()
  },
}

