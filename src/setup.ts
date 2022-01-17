import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { VersioningType } from '@nestjs/common'
// import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import path from 'path'
import { ValidationPipe } from './pipes/validation.pipe'
import { TrimPipe } from './pipes/trim.pipe'
import { IDPipe } from './pipes/id.pipe'
import { ExceptionFilter } from './filters/exception.filter'

function setupExpress(app: NestExpressApplication) {
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(cors())
  app.use(compression())

  // NOTE: for cache-pug-templates
  app.set('views', path.join(__dirname, '../mail/templates'))
  app.set('view engine', 'pug')

  // process.on('unhandledRejection', (reason, promise) => {
  //   console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  //   console.error('Process is exiting...')
  //   process.exit(1)
  // })
  // process.on('uncaughtException', (err, origin) => {
  //   console.error('Caught exception:', err, 'Exception origin:', origin)
  //   console.error('Process is exiting...')
  //   process.exit(1)
  // })
}

function setupNest(app: NestExpressApplication) {
  app.useStaticAssets(path.join(__dirname, '../public'))
  // https://docs.nestjs.com/techniques/versioning#versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  // https://docs.nestjs.com/faq/request-lifecycle#summary
  app.useGlobalInterceptors()
  app.useGlobalPipes(new ValidationPipe(), new TrimPipe(), new IDPipe())
  app.useGlobalFilters(new ExceptionFilter())
}

function setupSwagger(app: NestExpressApplication) {
  // TODO: pass values from config? SWAGGER_TITLE, etc
  const config = new DocumentBuilder()
    .setTitle('OpenAPI')
    .setDescription('')
    .setVersion('3.0.3')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  const options = { customCssUrl: '/assets/swagger-dark-theme.css' }
  SwaggerModule.setup('swagger', app, document, options)
}

// async function setupAsync(app: NestExpressApplication) {
//   const config = new AsyncApiDocumentBuilder()
//     .setTitle('AsyncAPI')
//     .setDescription('')
//     .setVersion('2.1.0')
//     .build()

//   const document = AsyncApiModule.createDocument(app, config)
//   const options = {}
//   await AsyncApiModule.setup('async', app, document, options)
// }

export async function setup(app: NestExpressApplication) {
  setupExpress(app)
  setupNest(app)
  setupSwagger(app)
  //   await setupAsync(app)
}
