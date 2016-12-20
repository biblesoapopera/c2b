import server from 'bso-server/server'

export default async () => {
  await server.start(config)


  console.log('HERE')

  await server.stop()
}
