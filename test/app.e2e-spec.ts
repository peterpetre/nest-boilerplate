import { Test, TestingModule } from '@nestjs/testing'
import { NestExpressApplication } from '@nestjs/platform-express'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { setup } from '../src/setup'

describe('AppController (e2e)', () => {
  let app: NestExpressApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    setup(app)
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200)
  })

  describe('ExamplesController (e2e)', () => {
    it('/v1/examples (GET)', () => {
      return request(app.getHttpServer()).get('/v1/examples').expect(200)
    })
  })

  describe('UsersController (e2e)', () => {
    it('/v1/users (GET)', () => {
      return request(app.getHttpServer()).get('/v1/users ').expect(401)
    })
  })

  // TODO: ...
})
