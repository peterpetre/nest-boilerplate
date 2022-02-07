import { Module } from '@nestjs/common'
import { ThrottlerModule as NestThrottlerModule } from '@nestjs/throttler'
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from './config.module'

@Module({
  imports: [
    NestThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('THROTTLE_TTL'),
        limit: configService.get('THROTTLE_LIMIT')
      })
    })
  ]
})
export class ThrottlerModule {}
