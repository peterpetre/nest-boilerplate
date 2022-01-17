import { Test, TestingModule } from '@nestjs/testing'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import config from '@/mikro-orm.config'
import { PassportModule } from '@/configs/passport.module'
// import { createExample } from './common/create-example'
import { UserEntity } from './entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let controller: AuthController
  // let service: AuthService
  let orm: MikroORM

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [UserEntity] }),
        PassportModule
      ],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile()

    controller = module.get<AuthController>(AuthController)
    // authService = module.get<AuthService>(AuthService)
    orm = module.get<MikroORM>(MikroORM)
  })

  afterEach(async () => await orm.close(true))

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  // TODO: ...
})
