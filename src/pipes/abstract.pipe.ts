import { PipeTransform, ArgumentMetadata } from '@nestjs/common'

export abstract class AbstractPipe implements PipeTransform {
  protected abstract transformValue(value: any, metadata: any): any

  protected except(): string[] {
    return []
  }

  private isObject(value: any): boolean {
    return typeof value === 'object' && value !== null
  }

  private transformObject(values: any, metadata: any): any {
    return Object.keys(values).reduce((res, key) => {
      const value = values[key]

      if (this.except().includes(key)) {
        return { ...res, [key]: value }
      }
      if (this.isObject(value)) {
        return { ...res, [key]: this.transformObject(value, metadata) }
      }

      return { ...res, [key]: this.transformValue(value, metadata) }
    }, {})
  }

  transform(values: any, metadata: ArgumentMetadata) {
    // CHECK: trim param and query
    if (this.isObject(values)) {
      return this.transformObject(values, metadata)
    }
    return this.transformValue(values, metadata)
  }
}
