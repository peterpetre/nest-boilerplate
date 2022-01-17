import { BadRequestException } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export class ValidationException extends BadRequestException {
  constructor(private readonly validationErrors: ValidationError[]) {
    super({
      message: 'Validation failed',
      validationErrors
    })
  }
}
