import { PipeTransform, ArgumentMetadata } from '@nestjs/common'
import { plainToClass, classToPlain } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '@/exceptions/validation.exception'
import { Slug } from '@/decorators/slug.decorator'

// CHECK: should be handled from ORM hooks with a slug library (slugify) and validate here e.g. isSlug

class ParamSlug {
  @Slug()
  slug: string
}

export class SlugPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata
    // NOTE: transform and validate param slug
    if (type === 'param' && data === 'slug') {
      const param = plainToClass(ParamSlug, { slug: value })
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
