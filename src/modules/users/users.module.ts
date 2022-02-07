import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { User } from './entities/user.entity'
import { AuthController } from './auth.controller'
import { UsersController } from './users.controller'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'

export * from './dto/create-user.dto'
export * from './dto/update-user.dto'
export * from './entities/user.entity'
export * from './users.service'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService],
  exports: [AuthService, UsersService]
})
export class UsersModule {}
