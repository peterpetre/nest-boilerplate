import { Test, TestingModule } from '@nestjs/testing'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import config from '@/mikro-orm.config'
import { File } from './entities/file.entity'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'

describe('FilesService', () => {
  let service: FilesService
  let orm: MikroORM

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [File] })
      ],
      controllers: [FilesController],
      providers: [FilesService]
    }).compile()

    service = module.get<FilesService>(FilesService)
    orm = module.get<MikroORM>(MikroORM)
  })

  afterEach(async () => await orm.close(true))

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // TODO: ...
})
