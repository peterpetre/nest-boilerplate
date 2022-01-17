import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { setup } from './setup'
import { seed } from './seed'
import { start } from './start'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn']
  })

  await setup(app)
  await seed(app)

  const PORT = 3000
  await app.listen(PORT, () => start(app))
}

bootstrap().catch((err) => console.error(err))
