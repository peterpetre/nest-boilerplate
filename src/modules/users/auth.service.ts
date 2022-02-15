import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TokenExpiredError } from 'jsonwebtoken'
import { wrap } from '@mikro-orm/core'
import bcrypt from 'bcrypt'
import { UserRepository, User } from './entities/user.entity'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  createAccessToken(user: User) {
    const payload = { sub: user.id, email: user.email, roles: user.roles }
    const accessToken = this.jwtService.sign(payload)
    return accessToken
  }

  getRefreshTokenOptions() {
    return {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION')
    }
  }

  createRefreshToken(user: User) {
    const payload = { sub: user.id }
    const refreshToken = this.jwtService.sign(
      payload,
      this.getRefreshTokenOptions()
    )
    return refreshToken
  }

  getPasswordResetTokenOptions() {
    return {
      secret: this.configService.get('PASSWORD_RESET_TOKEN_SECRET'),
      expiresIn: this.configService.get('PASSWORD_RESET_TOKEN_EXPIRATION')
    }
  }

  createPasswordResetToken(user: User) {
    const payload = { sub: user.id }
    const passwordResetToken = this.jwtService.sign(
      payload,
      this.getPasswordResetTokenOptions()
    )
    return passwordResetToken
  }

  async register(registerUserDto: RegisterUserDto) {
    try {
      const { password } = registerUserDto
      const user = this.userRepository.create(registerUserDto)
      const hashedPassword = await bcrypt.hash(password, 10)
      const refreshToken = this.createRefreshToken(user)
      wrap(user).assign({ hashedPassword, refreshToken })
      await this.userRepository.persistAndFlush(user)

      user.accessToken = this.createAccessToken(user)
      console.log(user)
      return user
    } catch (err) {
      throw err
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto
      const user = await this.userRepository.findOne({ email })
      if (!user) throw new BadRequestException("The email doesn't exist")

      const match = await bcrypt.compare(password, user.hashedPassword)
      if (!match) throw new BadRequestException('The password is incorrect')

      const refreshToken = this.createRefreshToken(user)
      wrap(user).assign({ refreshToken })
      await this.userRepository.persistAndFlush(user)

      user.accessToken = this.createAccessToken(user)
      return user
    } catch (err) {
      throw err
    }
  }

  async logout(id: number, done: any) {
    try {
      const user = await this.userRepository.findOne(id)
      if (!user) return

      wrap(user).assign({ refreshToken: null })
      await this.userRepository.persistAndFlush(user)
      done()
    } catch (err) {
      throw err
    }
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const { refreshToken } = refreshTokenDto
      const token = await this.jwtService.verifyAsync(
        refreshToken,
        this.getRefreshTokenOptions()
      )
      if (!token.sub)
        throw new UnprocessableEntityException('The refresh token is invalid')

      const user = await this.userRepository.findOne(token.sub)
      if (!user || user.refreshToken !== refreshToken)
        throw new UnprocessableEntityException('The refresh token is invalid')

      user.accessToken = this.createAccessToken(user)
      return user
    } catch (err) {
      throw err
      // if (err instanceof TokenExpiredError) {
      //   throw new UnprocessableEntityException('The refresh token is expired')
      // } else {
      //   throw new UnprocessableEntityException('The refresh token is invalid')
      // }
    }
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    try {
      const { newPassword } = changePasswordDto
      const user = await this.userRepository.findOne(id)
      if (!user) return

      const match = await bcrypt.compare(
        changePasswordDto.password,
        user.hashedPassword
      )
      if (!match) throw new BadRequestException('The password is incorrect')

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      wrap(user).assign({ hashedPassword })
      await this.userRepository.persistAndFlush(user)
    } catch (err) {
      throw err
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const { email } = forgotPasswordDto
      const user = await this.userRepository.findOne({ email })
      if (!user) throw new BadRequestException("The email doesn't exist")

      const passwordResetToken = this.createPasswordResetToken(user)
      wrap(user).assign({ passwordResetToken })
      await this.userRepository.persistAndFlush(user)
      return { passwordResetToken }
    } catch (err) {
      throw err
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      console.log(resetPasswordDto)
      const { passwordResetToken, newPassword } = resetPasswordDto

      const token = await this.jwtService.verifyAsync(
        passwordResetToken,
        this.getPasswordResetTokenOptions()
      )
      if (!token.sub)
        throw new UnprocessableEntityException('The refresh token is invalid')

      const user = await this.userRepository.findOne(token.sub)
      if (!user || user.passwordResetToken !== passwordResetToken)
        throw new UnprocessableEntityException('The refresh token is invalid')

      // CHECK: should i compare if new password is the same old?
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      wrap(user).assign({ hashedPassword, passwordResetToken: null })
      await this.userRepository.persistAndFlush(user)
    } catch (err) {
      throw err
    }
  }
}
