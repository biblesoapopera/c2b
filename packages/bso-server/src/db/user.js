import 'bso-model/User'
import mongoose from 'mongoose'

export default {
  find: criteria => mongoose.model('User').findOne(criteria).exec(),
  create: (userObj) => {
    let Model = mongoose.model('User')
    let model = new Model(userObj)
    return model.save()
  },
}

