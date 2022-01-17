import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { ValidationError } from './validation.error'

// TODO: improve
export class ResponseError {
  // @ApiProperty()
  // method: string

  // @ApiProperty()
  // path: string

  @ApiProperty()
  exceptionName: string

  @ApiProperty()
  statusCode: number // status

  @ApiProperty()
  error: string // statusText

  @ApiProperty()
  message: string

  @ApiProperty({ required: false })
  @IsOptional()
  validationErrors?: ValidationError[]

  // @ApiProperty()
  // timestamp: Date = new Date()
}
