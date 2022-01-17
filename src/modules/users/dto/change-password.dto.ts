import { PasswordProperty } from '../entities/user.entity'

export class ChangePasswordDto {
  @PasswordProperty()
  currentPassword: string

  @PasswordProperty()
  password: string

  @PasswordProperty()
  passwordConfirmation: string
}
