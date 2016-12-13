import 'bso-model/AudioHash'
import mongoose from 'mongoose'

export default {
  find: name => mongoose.model('AudioHash').findOne({name: name}).exec(),
  create: (name, hash) => {
    let Model = mongoose.model('AudioHash')
    let model = new Model({name: name, hash: hash})
    return model.save()
  },
  update: (name, hash) => mongoose.model('AudioHash').findOneAndUpdate({name: name}, {hash: hash}, {runValidators: true}).exec(),
  delete: (name) => mongoose.model('AudioHash').findOneAndRemove({name: name}).exec()
}
