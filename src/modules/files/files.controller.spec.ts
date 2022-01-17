import { Test, TestingModule } from '@nestjs/testing'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import config from '@/mikro-orm.config'
import { FileEntity } from './entities/file.entity'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'

describe('FilesController', () => {
  let controller: FilesController
  // let service: FilesService
  let orm: MikroORM

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [FileEntity] })
      ],
      controllers: [FilesController],
      providers: [FilesService]
    }).compile()

    controller = module.get<FilesController>(FilesController)
    // service = module.get<FilesService>(FilesService)
    orm = module.get<MikroORM>(MikroORM)
  })

  afterEach(async () => await orm.close(true))

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('uploadMultiple', () => {
    it.skip('should upload multiple files', async () => {
      // e2e
    })
  })

  describe('uploadSingle', () => {
    it.skip('should upload a single file', async () => {
      // e2e
    })
  })

  // TODO: ...
})
