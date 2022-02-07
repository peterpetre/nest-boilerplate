import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { File } from './entities/file.entity'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'

export * from './dto/create-file.dto'
export * from './dto/rename-file.dto'
export * from './entities/file.entity'
export * from './files.service'

@Module({
  imports: [MikroOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
