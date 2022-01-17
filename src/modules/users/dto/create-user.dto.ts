import { IsOptional } from 'class-validator'
import { Role } from '@/common/user.common'
import { EmailProperty, PasswordProperty } from '../entities/user.entity'

export class CreateUserDto {
  @EmailProperty()
  email: string

  @PasswordProperty()
  password: string

  @IsOptional()
  roles?: [Role]
}
