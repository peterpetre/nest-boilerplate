import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, IsInt } from 'class-validator'
import {
  Entity,
  Property,
  Repository,
  EntityRepositoryType,
  EntityRepository
} from '@mikro-orm/core'
import { BaseEntity } from '@/common/base.entity'

export function Fieldname() {
  return applyDecorators(
    ApiProperty({
      description: 'The fieldname of the file',
      example: 'file'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty()
  )
}

export function Originalname() {
  return applyDecorators(
    ApiProperty({
      description: 'The originalname of the file',
      example: 'example.jpg'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty()
  )
}

export function Encoding() {
  return applyDecorators(
    ApiProperty({
      description: 'The encoding of the file',
      example: '7bit'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty()
  )
}

export function Mimetype() {
  return applyDecorators(
    ApiProperty({
      description: 'The mimetype of the file',
      example: 'image/jpeg'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty()
  )
}

export function Destination() {
  return applyDecorators(
    ApiProperty({
      description: 'The destination of the file',
      example: './upload/file'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty()
  )
}

export function Filename() {
  return applyDecorators(
    ApiProperty({
      description: 'The filename of the file',
      example: 'uuid.jpg'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty()
  )
}

export function Path() {
  return applyDecorators(
    ApiProperty({
      description: 'The path of the file',
      example: 'upload/file/uuid.jpg'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty()
  )
}

export function Size() {
  return applyDecorators(
    ApiProperty({
      description: 'The size of the file',
      example: 407345
    }),
    Type(() => Number),
    IsInt(),
    IsNotEmpty()
  )
}

@Entity()
export class File extends BaseEntity {
  @Fieldname()
  @Property()
  fieldname: string

  @Originalname()
  @Property()
  originalname: string

  @Encoding()
  @Property()
  encoding: string

  @Mimetype()
  @Property()
  mimetype: string

  @Destination()
  @Property()
  destination: string

  @Filename()
  @Property()
  filename: string

  @Path()
  @Property()
  path: string

  @Size()
  @Property()
  size: number;

  [EntityRepositoryType]?: FileRepository
}

@Repository(File)
export class FileRepository extends EntityRepository<File> {
  // ...custom methods
}
