import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export function ID() {
  return applyDecorators(
    ApiProperty({
      description: 'An integer numeric identifier',
      example: 1
    }),
    Type(() => Number),
    IsInt(),
    Min(1)
  )
}
