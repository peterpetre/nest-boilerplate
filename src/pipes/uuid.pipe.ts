import { PipeTransform, ArgumentMetadata } from '@nestjs/common'
import { plainToClass, classToPlain } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '@/exceptions/validation.exception'
import { UUID } from '@/decorators/uuid.decorator'

// CHECK uuid vs nanoid

class ParamUUID {
  @UUID()
  uuid: string
}

export class UUIDPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata
    // NOTE: transform and validate param uuid
    if (type === 'param' && data === 'uuid') {
      const param = plainToClass(ParamUUID, { uuid: value })
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
