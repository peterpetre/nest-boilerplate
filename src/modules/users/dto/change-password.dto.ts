import { SameAs } from '@/decorators/same-as.decorator'
import { PasswordProperty } from '../entities/user.entity'

export class ChangePasswordDto {
  @PasswordProperty()
  password: string

  @PasswordProperty()
  newPassword: string

  @PasswordProperty()
  @SameAs('newPassword')
  newPasswordConfirmation: string
}
