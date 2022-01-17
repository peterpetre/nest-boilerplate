import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepository, UserEntity } from './entities/user.entity'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { ChangePasswordDto } from './dto/change-password.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  createAccessToken(user: UserEntity) {
    const payload = { sub: user.id, iss: user.email, roles: user.roles }
    // jti = uuid.v4()
    const accessToken = this.jwtService.sign(payload)
    // expiresIn: process.env.JWT_EXPIRES_IN
    return accessToken
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = this.userRepository.create(signUpDto)
      await this.userRepository.persistAndFlush(user)
      const accessToken = this.createAccessToken(user)
      return { accessToken }
    } catch (err) {
      throw err
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const { email } = signInDto
      const user = await this.userRepository.findOne({ email })
      if (!user) return
      const accessToken = this.createAccessToken(user)
      return { accessToken }
    } catch (err) {
      throw err
    }
  }

  async signOut(id: number) {
    try {
      const user = await this.userRepository.findOne(id)
      if (!user) return
      // TODO: e.g. remove token from database
      const accessToken = null
      return { accessToken }
    } catch (err) {
      throw err
    }
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.userRepository.findOne(id)
      if (!user) return
      console.log(user.id, changePasswordDto)
      return null
    } catch (err) {
      throw err
    }
  }
}
