import { SameAs } from '@/decorators/same-as.decorator'
import { EmailProperty, PasswordProperty } from '../entities/user.entity'

export class RegisterUserDto {
  @EmailProperty()
  email: string

  @PasswordProperty()
  password: string

  @PasswordProperty()
  @SameAs('password')
  passwordConfirmation: string
}
