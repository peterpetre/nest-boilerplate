import { Test, TestingModule } from '@nestjs/testing'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import config from '@/mikro-orm.config'
import { HttpModule } from '@/configs/http.module'
import { MailModule } from '@/configs/mail.module'
import { createExample } from './common/create-example'
import { Example } from './entities/example.entity'
import { ExamplesController } from './examples.controller'
import { ExamplesService } from './examples.service'

describe('ExamplesController', () => {
  let controller: ExamplesController
  let service: ExamplesService
  let orm: MikroORM

  beforeEach(async () => {
    // config.tsNode = true
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [Example] }),
        HttpModule,
        MailModule
      ],
      controllers: [ExamplesController],
      providers: [ExamplesService]
    }).compile()

    controller = module.get<ExamplesController>(ExamplesController)
    service = module.get<ExamplesService>(ExamplesService)
    orm = module.get<MikroORM>(MikroORM)
  })

  afterEach(async () => await orm.close(true))

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  // CRUD
  describe('create', () => {
    it('should create an example', async () => {
      const example = createExample(1, 'Alice')

      jest.spyOn(service, 'create').mockResolvedValue(example)

      const result = await controller.create(example)
      expect(result).toBe(example)
    })
  })

  describe('findAll', () => {
    it('should return an array of examples', async () => {
      const examples: Example[] = []
      examples.push(createExample(1, 'Alice'))
      examples.push(createExample(2, 'Bob'))

      jest.spyOn(service, 'findAll').mockResolvedValue(examples)

      const result = await controller.findAll()
      expect(result).toBe(examples)
    })
  })

  describe('findOne', () => {
    it('should return an example', async () => {
      const example = createExample(1, 'Alice')

      jest.spyOn(service, 'findOne').mockResolvedValue(example)

      const result = await controller.findOne(1)
      expect(result).toBe(example)
    })
  })

  describe('update', () => {
    it('should update an example', async () => {
      const example = createExample(1, 'Alice')

      jest.spyOn(service, 'update').mockResolvedValue(example)

      const result = await controller.update(1, example)
      expect(result).toBe(example)
    })
  })

  describe('remove', () => {
    it('should remove an example', async () => {
      const example = createExample(1, 'Alice')

      jest.spyOn(service, 'remove').mockResolvedValue(example)

      const result = await controller.remove(1)
      expect(result).toBe(example)
    })
  })

  // MORE
  describe('callExternalApi', () => {
    it('should call an external API', async () => {
      const response = {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      }
      jest
        .spyOn(service, 'callExternalApi')
        .mockResolvedValue(Promise.resolve(response))

      const result = await controller.callExternalApi()
      expect(result).toBe(response)
    })
  })

  describe('callExternalApiV2', () => {
    it('should call an external API', async () => {
      const response = {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      }

      jest.spyOn(service, 'callExternalApiV2').mockResolvedValue(response)

      const result = await controller.callExternalApiV2()
      expect(result).toBe(response)
    })
  })

  describe('sendMail', () => {
    it('should send a mail', async () => {
      const response = {
        envelope: {},
        messageId: '',
        message: '',
        originalMessage: {}
      }

      jest.spyOn(service, 'sendMail').mockResolvedValue(response)

      const result = await controller.sendMail()
      expect(result).toBe(response)
    })
  })
})
