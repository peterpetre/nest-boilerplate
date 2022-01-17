import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsNotEmpty } from 'class-validator'

export class RenameFileDto {
  @ApiProperty({
    description: 'The new name of the file',
    example: 'example'
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string
}
