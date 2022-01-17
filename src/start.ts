import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import CachePugTemplates from 'cache-pug-templates'
import path from 'path'

export async function start(app: NestExpressApplication) {
  const cache = new CachePugTemplates({
    app: app.getHttpAdapter().getInstance(),
    views: path.join(__dirname, '../mail/templates')
  })
  cache.start()

  const url = await app.getUrl()
  const serverUrl = url.replace('[::1]', 'localhost')
  const swaggerUrl = serverUrl + '/swagger'
  // const asyncUrl = serverUrl + '/async'
  // const graphqlUrl = serverUrl + '/graphql'
  const configService = app.get(ConfigService)
  const dbName = configService.get('DB_NAME')
  const adminerUrl = serverUrl.replace('3000', '3001') + `/?db=${dbName}`
  console.log(
    '\n',
    `The server has started and is listening at ${serverUrl}`,
    '\n',
    '\n',
    `OpenAPI (Swagger)                 ${swaggerUrl}`,
    '\n',
    // `AsyncAPI (HTML-Template)          ${asyncUrl}`,
    // '\n',
    // `GraphQL (Playground)              ${graphqlUrl}`,
    // '\n',
    `DBMS (Adminer)                    ${adminerUrl}`,
    '\n'
  )
}
