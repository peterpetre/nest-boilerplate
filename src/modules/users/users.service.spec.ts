import { Test, TestingModule } from '@nestjs/testing'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import config from '@/mikro-orm.config'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  let orm: MikroORM

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [User] })
      ],
      providers: [UsersService]
    }).compile()

    service = module.get<UsersService>(UsersService)
    orm = module.get<MikroORM>(MikroORM)
  })

  afterEach(async () => await orm.close(true))

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // TODO: ...
})
