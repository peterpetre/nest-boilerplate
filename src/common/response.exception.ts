import { HttpException } from '@nestjs/common'
import { InvalidFieldNameException } from '@mikro-orm/core'

// TODO: add more DB / ORM exceptions
export type ResponseException = HttpException | InvalidFieldNameException
