import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsInt,
  Min,
  IsString,
  IsNotEmpty,
  Length,
  IsOptional
} from 'class-validator'
import {
  Entity,
  Property,
  Repository,
  EntityRepositoryType,
  EntityRepository
} from '@mikro-orm/core'
import { BaseEntity } from '@/common/base.entity'

export function NameProperty() {
  return applyDecorators(
    ApiProperty({
      description: 'An example of a name',
      example: 'Alice'
    }),
    IsString(),
    IsNotEmpty(),
    Length(3, 13)
  )
}

export function NumberProperty() {
  return applyDecorators(
    ApiProperty({
      description: 'An example of a number',
      example: 13
    }),
    IsInt(),
    Min(1),
    IsOptional()
  )
}

@Entity()
export class Example extends BaseEntity {
  @NameProperty()
  @Property()
  name: string

  @NumberProperty()
  @Property()
  number?: number;

  // toRO(): Example {
  //     const ro = wrap(this).toObject()
  //     return ro as Example
  // }

  [EntityRepositoryType]?: ExampleRepository
}

@Repository(Example)
export class ExampleRepository extends EntityRepository<Example> {
  // ...custom methods
}
