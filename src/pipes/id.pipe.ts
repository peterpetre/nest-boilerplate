import { PipeTransform, ArgumentMetadata } from '@nestjs/common'
import { plainToClass, classToPlain } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '@/exceptions/validation.exception'
import { ID } from '@/decorators/id.decorator'

class ParamID {
  @ID()
  id: number
}

export class IDPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata
    // NOTE: transform and validate param id
    if (type === 'param' && data === 'id') {
      const param = plainToClass(ParamID, { id: value })
      return validate(param).then((validationErrors) => {
        if (validationErrors.length > 0) {
          throw new ValidationException(validationErrors)
        }
        return classToPlain(param).id
      })
    }
    return value
  }
}
