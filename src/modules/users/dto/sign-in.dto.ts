import { EmailProperty, PasswordProperty } from '../entities/user.entity'

export class SignInDto {
  @EmailProperty()
  email: string

  @PasswordProperty()
  password: string
}
