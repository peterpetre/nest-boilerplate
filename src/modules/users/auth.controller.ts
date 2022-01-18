import { Controller, Body, Post, VERSION_NEUTRAL } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ApiResponseCommon } from '@/decorators/api-response-common.decorator'
import { handleResponse } from '@/handlers/response.handler'
import { AuthGuard } from '@/guards/auth.guard'
import { User } from '@/decorators/user.decorator'
import { AuthService } from './auth.service'
import { UserEntity } from './entities/user.entity'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { ChangePasswordDto } from './dto/change-password.dto'

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
    description: 'The user has been successfully signed up',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Post('signup')
  signup(@Body() signUp: SignUpDto) {
    return handleResponse(() => this.authService.signUp(signUp))
  }

  @ApiOperation({ summary: 'Log in with your existing account' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully signed in',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Post('signin')
  signin(@Body() signIn: SignInDto) {
    return handleResponse(() => this.authService.signIn(signIn))
  }

  @ApiOperation({ summary: 'Log out from your account' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully signed out',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Post('signout')
  @AuthGuard()
  signout(@User() user: UserEntity) {
    // TEST:
    return handleResponse(() =>
      user ? this.authService.signOut(user.id) : null
    )
  }

  // TODO: validate / authenticate

  @ApiOperation({ summary: 'Change your password' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully changed the password',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Post('change-password')
  @AuthGuard()
  changePassword(
    @User() user: UserEntity,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    console.log(changePasswordDto)
    return handleResponse(() =>
      this.authService.changePassword(user.id, changePasswordDto)
    )
  }
}
