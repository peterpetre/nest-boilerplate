import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import {
  Entity,
  Property,
  Repository,
  EntityRepositoryType,
  EntityRepository,
  Unique,
  BeforeCreate,
  BeforeUpdate,
  OneToOne
} from '@mikro-orm/core'
import { Type } from 'class-transformer'
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength
  // Matches
} from 'class-validator'
import bcrypt from 'bcrypt'
import { BaseEntity } from '@/common/base.entity'
import { Role } from '@/common/user.common'
import { FileEntity } from '@/modules/files/files.module'

export function EmailProperty() {
  return applyDecorators(
    ApiProperty({
      description: 'The email of a user',
      example: 'user@example.com'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty(),
    IsEmail()
  )
}

export function PasswordProperty() {
  return applyDecorators(
    ApiProperty({
      description: 'The password of a user',
      example: 'user'
    }),
    Type(() => String),
    IsString(),
    IsNotEmpty(),
    MinLength(4),
    MaxLength(20)
    // Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //   message: 'Password is too weak'
    // })
  )
}

@Entity({ tableName: 'user' })
export class UserEntity extends BaseEntity {
  @EmailProperty()
  @Property()
  @Unique()
  email: string

  @Property()
  roles: [Role] = [Role.User]

  // @Type(() => String)
  // @IsString()
  // @MinLength(4)
  // @MaxLength(20)
  // @Property()
  // password: string

  @Property()
  password: string

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  @OneToOne({ entity: () => FileEntity, nullable: true, orphanRemoval: true })
  avatar?: FileEntity;

  [EntityRepositoryType]?: UserRepository
}

@Repository(UserEntity)
export class UserRepository extends EntityRepository<UserEntity> {
  // ...custom methods
}
