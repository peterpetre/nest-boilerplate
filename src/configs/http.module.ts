import { Global, Module } from '@nestjs/common'
import { HttpModule as NestHttpModule } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from './config.module'

@Global()
@Module({
  imports: [
    NestHttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT') || 5000,
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS') || 5
      })
    })
  ],
  exports: [NestHttpModule]
})
export class HttpModule {}
