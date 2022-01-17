import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthGuard as NestAuthGuard } from '@nestjs/passport'
import { Role, ROLES_KEY } from '@/common/user.common'
import { RolesGuard } from './roles.guard'

export function AuthGuard(...roles: Role[]) {
  if (roles.length) {
    return applyDecorators(
      SetMetadata(ROLES_KEY, roles),
      UseGuards(NestAuthGuard('jwt'), RolesGuard),
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' })
    )
  }
  return applyDecorators(
    UseGuards(NestAuthGuard('jwt')),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  )
}
