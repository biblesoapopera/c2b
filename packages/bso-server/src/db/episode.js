import 'bso-model/Episode'
import mongoose from 'mongoose'

export default {
  find: id => mongoose.model('Episode').findOne({id: id}).exec()
}
