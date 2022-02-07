import { EmailProperty } from '../entities/user.entity'

export class ForgotPasswordDto {
  @EmailProperty()
  email: string
}
