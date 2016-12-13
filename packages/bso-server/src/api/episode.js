import create from './episode/create'
import readId from './episode/readId'
import update from './episode/update'
import episodeDelete from './episode/delete'

export default {
  create: create,
  readId: readId,
  update: update,
  'delete': episodeDelete
}
