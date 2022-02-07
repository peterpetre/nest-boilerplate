import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger'
import {
  Entity,
  Property,
  Repository,
  EntityRepositoryType,
  EntityRepository,
  Unique,
  OneToOne
} from '@mikro-orm/core'
import { Exclude } from 'class-transformer'
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength
  // Matches
} from 'class-validator'
import { BaseEntity } from '@/common/base.entity'
import { Role } from '@/common/user.common'
import { File } from '@/modules/files/files.module'

export function EmailProperty() {
  return applyDecorators(
    ApiProperty({
      description: 'The email of a user',
      example: 'user@example.com'
    }),
    // Type(() => String),
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
    // Type(() => String),
    IsString(),
    IsNotEmpty(),
    MinLength(4),
    MaxLength(20)
    // Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //   message: 'Password is too weak'
    // })
  )
}

@Entity()
export class User extends BaseEntity {
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
  @Exclude()
  @ApiHideProperty()
  hashedPassword: string

  @Property({ nullable: true })
  @Exclude()
  @ApiHideProperty()
  passwordResetToken: string

  accessToken: string

  @Property({ nullable: true })
  refreshToken: string

  @OneToOne({ entity: () => File, nullable: true, orphanRemoval: true })
  avatar?: File;

  [EntityRepositoryType]?: UserRepository
}

@Repository(User)
export class UserRepository extends EntityRepository<User> {
  // ...custom methods
}
