import { Type } from 'class-transformer'
import { IsEnum, IsString, IsNumber, IsEmail } from 'class-validator'

enum Environment {
  Development = 'development',
  Test = 'test',
  Staging = 'staging',
  Production = 'production'
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @Type(() => Number)
  @IsNumber()
  THROTTLE_TTL = 60

  @Type(() => Number)
  @IsNumber()
  THROTTLE_LIMIT = 10

  @Type(() => Number)
  @IsNumber()
  HTTP_TIMEOUT = 5000

  @Type(() => Number)
  @IsNumber()
  HTTP_MAX_REDIRECTS = 5

  @Type(() => String)
  @IsString()
  DB_HOST = 'localhost'

  @Type(() => String)
  @IsString()
  DB_USERNAME = 'root'

  @Type(() => String)
  @IsString()
  DB_PASSWORD = 'root'

  @Type(() => String)
  @IsString()
  DB_NAME = 'main'

  @Type(() => String)
  @IsString()
  JWT_SECRET_KEY = 'SECRET'

  @Type(() => Number)
  @IsNumber()
  JWT_EXPIRES_IN = 3600

  @Type(() => String)
  @IsEmail()
  ADMIN_EMAIL = 'admin@example.com'

  @Type(() => String)
  @IsEmail()
  MAIL_FROM = 'noreply@example.com'
}

export const DefaultConfig = new EnvironmentVariables()
