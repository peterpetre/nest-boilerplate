import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'

// NOTE: required property (non empty) in the request object
export const Required = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (!request[data]) {
      throw new BadRequestException(
        `The ${data} object is required in the request object`
      )
    }
  }
)
