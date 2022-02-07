import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator
} from 'class-validator'

@ValidatorConstraint({ name: 'SameAs' })
class SameAsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints
    const relatedValue = (args.object as any)[relatedPropertyName]
    return value === relatedValue
  }

  defaultMessage() {
    return '$property must be the same as $constraint1'
  }
}

export function SameAs(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'sameAs',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: SameAsConstraint
    })
  }
}
