import { Global, Injectable, Module } from '@nestjs/common'
import {
  PassportModule as NestPassportModule,
  PassportStrategy
} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from './config.module'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'SECRET'
    })
  }

  async validate(payload: any) {
    // CHECK: hit database or not? think about refresh token architecture
    // const user = await this.usersService.findOne(payload.id)
    // if (!user) {
    //   throw new UnauthorizedException('Invalid token')
    // }
    // return user
    return { id: payload.sub, email: payload.iss, roles: payload.roles }
  }
}

@Global()
@Module({
  imports: [
    ConfigModule,
    NestPassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY') || 'SECRET',
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || 3600
        }
      })
    })
  ],
  providers: [JwtStrategy],
  exports: [NestPassportModule, JwtModule]
})
export class PassportModule {}
