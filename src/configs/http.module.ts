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
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS')
      })
    })
  ],
  exports: [NestHttpModule]
})
export class HttpModule {}
