import {
  Global,
  Injectable,
  Module
  // UnauthorizedException
} from '@nestjs/common'
import {
  PassportModule as NestPassportModule,
  PassportStrategy
} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { UsersModule } from '@/modules/users/users.module'
import { UsersService } from '@/modules/users/users.service'
import { DefaultConfig } from '@/default.config'
import { ConfigModule } from './config.module'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.ACCESS_TOKEN_SECRET || DefaultConfig.ACCESS_TOKEN_SECRET
    })
  }

  async validate(payload: any) {
    // const user = await this.usersService.findOne(payload.sub)
    // if (!user) {
    //   throw new UnauthorizedException('The access token is invalid')
    // }
    // return user
    // NOTE: keep it stateless for now
    return { id: payload.sub, email: payload.email, roles: payload.roles }
  }
}

@Global()
@Module({
  imports: [
    ConfigModule,
    UsersModule,
    NestPassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get('ACCESS_TOKEN_EXPIRATION')
        }
      })
    })
  ],
  providers: [JwtStrategy],
  exports: [NestPassportModule, JwtModule]
})
export class PassportModule {}
