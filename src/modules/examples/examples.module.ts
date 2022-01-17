import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { ExampleEntity } from './entities/example.entity'
import { ExamplesController } from './examples.controller'
import { ExamplesService } from './examples.service'

export * from './common/create-example'
export * from './dto/create-example.dto'
export * from './dto/update-example.dto'
export * from './entities/example.entity'
export * from './examples.service'

@Module({
  imports: [MikroOrmModule.forFeature([ExampleEntity])],
  controllers: [ExamplesController],
  providers: [ExamplesService],
  exports: [ExamplesService]
})
export class ExamplesModule {}
