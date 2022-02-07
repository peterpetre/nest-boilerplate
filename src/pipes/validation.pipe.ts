import { ValidationPipe as NestValidationPipe } from '@nestjs/common'
import { ValidationException } from '@/exceptions/validation.exception'

// https://docs.nestjs.com/techniques/validation
export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      whitelist: true,
      // NOTE: transform seems to not work otherwise we dont need @Type(() => Number)
      // the issue seems that is only when there is a default value instead of a type e.g. prop = 123
      // https://docs.nestjs.com/techniques/validation#transform-payload-objects
      // transform: true,
      // NOTE2: now with the bellow works fine... @Type is commented on the code until be sure
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (validationErrors) =>
        new ValidationException(validationErrors)
    })
  }
}
