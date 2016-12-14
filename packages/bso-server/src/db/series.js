import 'bso-model/Series'
import mongoose from 'mongoose'

export default {
  find: conditions => mongoose.model('Series').find(conditions).exec(),
  findId: id => mongoose.model('Series').findById(id).exec(),
  create: (seriesObj) => {
    let Model = mongoose.model('Series')
    let model = new Model(seriesObj)
    return model.save()
  },
  update: (conditions, seriesObj) => {
    return mongoose.model('Series').findOneAndUpdate(conditions, seriesObj, {runValidators: true}).exec()
  },
  delete: (conditions) => mongoose.model('Series').findOneAndRemove(conditions).exec()
}
