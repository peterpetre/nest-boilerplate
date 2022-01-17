import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ApiResponseCommon } from '@/decorators/api-response-common.decorator'
import { handleResponse } from '@/handlers/response.handler'
import { AuthGuard } from '@/guards/auth.guard'
import { Role } from '@/common/user.common'
import { UsersService } from './users.service'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Post()
  @AuthGuard(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return handleResponse(() => this.usersService.create(createUserDto))
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users.',
    type: [UserEntity]
  })
  @ApiResponseCommon()
  @Get()
  @AuthGuard(Role.User)
  findAll() {
    return handleResponse(() => this.usersService.findAll())
  }

  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    status: 200,
    description: 'Return the user.',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Get(':id')
  @AuthGuard(Role.User)
  findOne(@Param('id') id: number) {
    return handleResponse(() => this.usersService.findOne(id))
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully updated',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Patch(':id')
  @AuthGuard(Role.Admin)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return handleResponse(() => this.usersService.update(id, updateUserDto))
  }

  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully removed',
    type: UserEntity
  })
  @ApiResponseCommon()
  @Delete(':id')
  @AuthGuard(Role.Admin)
  remove(@Param('id') id: number) {
    return handleResponse(() => this.usersService.remove(id))
  }
}
