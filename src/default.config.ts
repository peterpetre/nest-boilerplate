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

  @Type(() => Number)
  @IsNumber()
  DB_PORT = 3306

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
  ACCESS_TOKEN_SECRET = 'SECRET_ACCESS'

  @Type(() => String)
  @IsString()
  ACCESS_TOKEN_EXPIRATION = '15m'

  @Type(() => String)
  @IsString()
  REFRESH_TOKEN_SECRET = 'SECRET_REFRESH'

  @Type(() => String)
  @IsString()
  REFRESH_TOKEN_EXPIRATION = '7d'

  @Type(() => String)
  @IsString()
  PASSWORD_RESET_TOKEN_SECRET = 'SECRET_PASSWORD_RESET'

  @Type(() => String)
  @IsString()
  PASSWORD_RESET_TOKEN_EXPIRATION = '30m'

  @Type(() => String)
  @IsEmail()
  ADMIN_EMAIL = 'admin@example.com'

  @Type(() => String)
  @IsEmail()
  MAIL_FROM = 'noreply@example.com'

  @Type(() => Number)
  @IsNumber()
  UPLOAD_MAX_FILESIZE = 10485760 // 10MB
}

export const DefaultConfig = new EnvironmentVariables()
