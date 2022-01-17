import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpStatus,
  Logger
} from '@nestjs/common'
import { Request, Response } from 'express'
import { STATUS_CODES } from 'http'
import { ResponseError } from '@/common/response.error'

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const exceptionName = exception.constructor.name
    const status = exception?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
    const statusText = STATUS_CODES[status] ?? ''
    const message = exception.message?.message ?? exception.message
    const validationErrors = exception?.response?.validationErrors

    // NOTE: handle if needed other exceptions e.g. database
    // TODO: UniqueConstraintViolationException, ...
    // switch (exception.constructor) {
    //     case OtherException:
    //         break
    //     default:
    // }

    if (status === 500)
      Logger.error(
        message,
        // exception.stack
        `${request.method} ${request.url}`
      )

    // NOTE: keep it close to nestjs format
    const error = {
      // method: request.method,
      // path: request.url,
      statusCode: status,
      message,
      error: statusText,
      validationErrors,
      exceptionName
      // timestamp: new Date()
    } as ResponseError

    response.status(status).json(error)
  }
}
