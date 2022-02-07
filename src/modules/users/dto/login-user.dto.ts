import { EmailProperty, PasswordProperty } from '../entities/user.entity'

export class LoginUserDto {
  @EmailProperty()
  email: string

  @PasswordProperty()
  password: string
}
