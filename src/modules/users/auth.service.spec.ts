import { Test, TestingModule } from '@nestjs/testing'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import config from '@/mikro-orm.config'
import { PassportModule } from '@/configs/passport.module'
import { User } from './entities/user.entity'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let orm: MikroORM

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [User] }),
        PassportModule
      ],
      providers: [AuthService]
    }).compile()

    service = module.get<AuthService>(AuthService)
    orm = module.get<MikroORM>(MikroORM)
  })

  afterEach(async () => await orm.close(true))

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // TODO: ...
})
