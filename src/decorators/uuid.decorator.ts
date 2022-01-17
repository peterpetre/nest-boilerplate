import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsUUID } from 'class-validator'

export function UUID() {
  return applyDecorators(
    ApiProperty({
      description: 'A randomly generated unique identifier (UUID v4)',
      example: 'a953e2db-42fe-4a0b-a84d-0f0094643528'
    }),
    Type(() => String),
    IsString(),
    IsUUID(4)
  )
}
