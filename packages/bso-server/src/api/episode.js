import create from './episode/create'
import readId from './episode/readId'
import readOrphan from './episode/readOrphan'
import update from './episode/update'
import episodeDelete from './episode/delete'

export default {
  create: create,
  readId: readId,
  readOrphan: readOrphan,
  update: update,
  'delete': episodeDelete
}
