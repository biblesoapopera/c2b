import 'bso-model/Episode'
import mongoose from 'mongoose'

export default {
  find: criteria => mongoose.model('Episode').find(criteria).exec(),
  findId: id => mongoose.model('Episode').findById(id).exec(),
  create: (episodeObj) => {
    let Model = mongoose.model('Episode')
    let model = new Model(episodeObj)
    return model.save()
  },
  update: (id, episodeObj) => mongoose.model('Episode').findByIdAndUpdate(id, episodeObj, {runValidators: true}).exec(),
  delete: (id) => mongoose.model('Episode').findByIdAndRemove(id).exec()
}
