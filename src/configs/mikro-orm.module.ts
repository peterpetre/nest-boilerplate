import { Module } from '@nestjs/common'
import { MikroOrmModule as NestMikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [NestMikroOrmModule.forRoot()]
})
export class MikroOrmModule {}
