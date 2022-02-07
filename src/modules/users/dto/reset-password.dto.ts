import { IsString, IsNotEmpty } from 'class-validator'
import { SameAs } from '@/decorators/same-as.decorator'
import { PasswordProperty } from '../entities/user.entity'

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  passwordResetToken: string

  @PasswordProperty()
  newPassword: string

  @PasswordProperty()
  @SameAs('newPassword')
  newPasswordConfirmation: string
}
