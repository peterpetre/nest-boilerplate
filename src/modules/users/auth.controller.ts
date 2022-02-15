import {
  Controller,
  Body,
  Post,
  Patch,
  VERSION_NEUTRAL,
  Request
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ApiResponseCommon } from '@/decorators/api-response-common.decorator'
import { handleResponse } from '@/handlers/response.handler'
import { AuthGuard } from '@/guards/auth.guard'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new account' })
  @ApiResponse({
    status: 201,
    description: 'You have been successfully registered',
    type: User
  })
  @ApiResponseCommon()
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return handleResponse(() => this.authService.register(registerUserDto))
  }

  @ApiOperation({ summary: 'Log-in with your existing account' })
  @ApiResponse({
    status: 201,
    description: 'You have been successfully logged in',
    type: User
  })
  @ApiResponseCommon()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return handleResponse(() => this.authService.login(loginUserDto))
  }

  @ApiOperation({ summary: 'Log-out from your account' })
  @ApiResponse({
    status: 201,
    description: 'You have been successfully logged out'
  })
  @ApiResponseCommon()
  @Post('logout')
  @AuthGuard()
  async logout(@Request() req: any, @CurrentUser() user: User) {
    return this.authService.logout(user.id, () =>
      req.res.setHeader('Authorization', null)
    )
  }

  @ApiOperation({ summary: 'Refresh your access token' })
  @ApiResponse({
    status: 201,
    description: 'Your access token has been successfully refreshed',
    type: User
  })
  @ApiResponseCommon()
  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return handleResponse(() => this.authService.refresh(refreshTokenDto))
  }

  @ApiOperation({ summary: 'Change your password' })
  @ApiResponse({
    status: 201,
    description: 'Your password has been successfully changed'
  })
  @ApiResponseCommon()
  @Patch('change-password')
  @AuthGuard()
  changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return handleResponse(() =>
      this.authService.changePassword(user.id, changePasswordDto)
    )
  }

  @ApiOperation({ summary: 'Create a password reset token' })
  @ApiResponse({
    status: 201,
    description: 'The password reset token has been successfully created'
  })
  @ApiResponseCommon()
  @Patch('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return handleResponse(() =>
      this.authService.forgotPassword(forgotPasswordDto)
    )
  }

  @ApiOperation({ summary: 'Reset your password' })
  @ApiResponse({
    status: 201,
    description: 'The password has been successfully reseted'
  })
  @ApiResponseCommon()
  @Patch('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return handleResponse(() =>
      this.authService.resetPassword(resetPasswordDto)
    )
  }
}
