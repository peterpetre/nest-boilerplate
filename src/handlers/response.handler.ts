import {
  HttpException,
  HttpStatus,
  UnprocessableEntityException
} from '@nestjs/common'

// NOTE: handle the result from a service at the controller level
export async function handleResponse(service: any) {
  try {
    const res = await service()
    if (!res) {
      throw new HttpException('No content found', HttpStatus.NO_CONTENT)
    }
    // CHECK: maybe this will change in the future
    if (typeof res === 'string') {
      throw new HttpException(res, HttpStatus.NO_CONTENT)
    }
    return res
  } catch (err) {
    if (typeof err === 'string') {
      // throw new Error(err)
      throw new UnprocessableEntityException(err)
    }
    throw err
  }
}
