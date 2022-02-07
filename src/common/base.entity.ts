// import { Type } from 'class-transformer'
import { IsDate } from 'class-validator'
import { PrimaryKey, Property } from '@mikro-orm/core'
import { ID } from '@/decorators/id.decorator'

export abstract class BaseEntity {
  @ID()
  @PrimaryKey()
  id: number

  // @Type(() => Date)
  @IsDate()
  @Property()
  createdAt: Date = new Date()

  // @Type(() => Date)
  @IsDate()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
