import { EmailProperty, PasswordProperty } from '../entities/user.entity'

export class SignUpDto {
  @EmailProperty()
  email: string

  @PasswordProperty()
  password: string
}
