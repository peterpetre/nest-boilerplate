import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvironmentVariables } from '@/default.config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
      load: [
        () => ({
          IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
          IS_TEST: process.env.NODE_ENV === 'test',
          IS_STAGING: process.env.NODE_ENV === 'staging',
          IS_PRODUCTION: process.env.NODE_ENV === 'production'
        })
      ],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate: (config: Record<string, unknown>) => {
        const validatedConfig = plainToClass(EnvironmentVariables, config)
        const errors = validateSync(validatedConfig)
        if (errors.length > 0) throw new Error(errors.toString())
        return validatedConfig
      }
    })
  ]
})
export class ConfigModule {}
