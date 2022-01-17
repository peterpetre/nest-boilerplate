import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString } from 'class-validator'

export function Slug() {
  return applyDecorators(
    ApiProperty({
      description: '',
      example: ''
    }),
    Type(() => String),
    IsString()
  )
}
