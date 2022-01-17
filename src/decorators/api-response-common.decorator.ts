import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { ResponseError } from '@/common/response.error'

function buildApiResponse(status: number) {
  return {
    status,
    description: `Return status code ${status}.`,
    type: status >= 400 ? ResponseError : undefined
  }
}

export function ApiResponseCommon() {
  return applyDecorators(
    ApiResponse(buildApiResponse(HttpStatus.NO_CONTENT)),
    ApiResponse(buildApiResponse(HttpStatus.INTERNAL_SERVER_ERROR))
  )
}
