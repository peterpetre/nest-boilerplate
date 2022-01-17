import { Test, TestingModule } from '@nestjs/testing'
import { MikroORM, EntityRepository } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import config from '@/mikro-orm.config'
import { HttpModule } from '@/configs/http.module'
import { MailModule } from '@/configs/mail.module'
import { createExample } from './common/create-example'
import { ExampleEntity } from './entities/example.entity'
import { ExamplesService } from './examples.service'

describe('ExamplesService', () => {
  let service: ExamplesService
  let orm: MikroORM

  beforeEach(async () => {
    // config.tsNode = true
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [ExampleEntity] }),
        HttpModule,
        MailModule
      ],
      providers: [ExamplesService]
    }).compile()

    service = module.get<ExamplesService>(ExamplesService)
    orm = module.get<MikroORM>(MikroORM)
  })

  afterEach(async () => await orm.close(true))

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // CRUD
  describe('create', () => {
    it('should create an example', async () => {
      const name = 'Alice'
      const example = createExample(1, name)

      jest
        .spyOn(EntityRepository.prototype, 'create')
        .mockResolvedValue(example)

      jest
        .spyOn(EntityRepository.prototype, 'persistAndFlush')
        .mockResolvedValue()

      const result = await service.create({ name })
      expect(result).toBe(example)
    })
  })

  describe('findAll', () => {
    it('should return an array of examples', async () => {
      const examples: ExampleEntity[] = []
      examples.push(createExample(1, 'Alice'))
      examples.push(createExample(2, 'Bob'))

      jest
        .spyOn(EntityRepository.prototype, 'findAll')
        .mockResolvedValue(examples)

      const result = await service.findAll()
      expect(result).toBe(examples)
    })
  })

  describe('findOne', () => {
    it('should return an example', async () => {
      const example = createExample(1, 'Alice')

      jest
        .spyOn(EntityRepository.prototype, 'findOne')
        .mockResolvedValue(example)

      const result = await service.findOne(1)
      expect(result).toBe(example)
    })
  })

  describe('update', () => {
    it('should update an example', async () => {
      const oldName = 'Alice'
      const example = createExample(1, oldName)
      const newName = 'Bob'

      jest
        .spyOn(EntityRepository.prototype, 'findOne')
        .mockResolvedValue(example)

      jest
        .spyOn(EntityRepository.prototype, 'persistAndFlush')
        .mockResolvedValue()

      const result = await service.update(1, { name: newName })
      expect(result?.name).toBe(newName)
    })
  })

  describe('remove', () => {
    it('should remove an example', async () => {
      const name = 'Alice'
      const example = createExample(1, name)

      jest
        .spyOn(EntityRepository.prototype, 'findOne')
        .mockResolvedValue(example)

      jest
        .spyOn(EntityRepository.prototype, 'persistAndFlush')
        .mockResolvedValue()

      const result = await service.remove(1)
      expect(result).toBe(example)
    })
  })

  // MORE
  describe('callExternalApi', () => {
    it('should call an external API', async () => {
      const result = await service.callExternalApi()
      expect(result).toBeDefined()
    })
  })

  describe('callExternalApiV2', () => {
    it('should call an external API', async () => {
      const result = await service.callExternalApiV2()
      expect(result).toBeDefined()
    })
  })

  describe('sendMail', () => {
    it('should send a mail', async () => {
      const result = await service.sendMail()
      expect(result).toBeDefined()
    })
  })
})
