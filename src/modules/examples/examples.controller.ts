import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ApiResponseCommon } from '@/decorators/api-response-common.decorator'
import { handleResponse } from '@/handlers/response.handler'
import { ExamplesService } from './examples.service'
import { Example } from './entities/example.entity'
import { CreateExampleDto } from './dto/create-example.dto'
import { UpdateExampleDto } from './dto/update-example.dto'

@ApiTags('examples')
@Controller('examples')
export class ExamplesController {
  constructor(private readonly examplesService: ExamplesService) {}

  // CRUD
  @ApiOperation({ summary: 'Create an example' })
  @ApiResponse({
    status: 201,
    description: 'The example has been successfully created',
    type: Example
  })
  @ApiResponseCommon()
  @Post('crud')
  create(@Body() createExampleDto: CreateExampleDto) {
    return handleResponse(() => this.examplesService.create(createExampleDto))
  }

  @ApiOperation({ summary: 'Get all examples' })
  @ApiResponse({
    status: 200,
    description: 'Return all examples',
    type: [Example]
  })
  @ApiResponseCommon()
  @Get('crud')
  findAll() {
    return handleResponse(() => this.examplesService.findAll())
  }

  @ApiOperation({ summary: 'Get an example' })
  @ApiResponse({
    status: 200,
    description: 'Return the example',
    type: Example
  })
  @ApiResponseCommon()
  @Get('crud/:id')
  findOne(@Param('id') id: number) {
    return handleResponse(() => this.examplesService.findOne(id))
  }

  @ApiOperation({ summary: 'Update an example' })
  @ApiResponse({
    status: 201,
    description: 'The example has been successfully updated',
    type: Example
  })
  @ApiResponseCommon()
  @Patch('crud/:id')
  update(@Param('id') id: number, @Body() updateExampleDto: UpdateExampleDto) {
    return handleResponse(() =>
      this.examplesService.update(id, updateExampleDto)
    )
  }

  @ApiOperation({ summary: 'Remove an example' })
  @ApiResponse({
    status: 201,
    description: 'The example has been successfully removed',
    type: Example
  })
  @ApiResponseCommon()
  @Delete('crud/:id')
  remove(@Param('id') id: number) {
    return handleResponse(() => this.examplesService.remove(id))
  }

  // MORE
  @ApiOperation({ summary: 'Call an external API' })
  @ApiResponse({
    status: 200,
    description: 'Return the result'
  })
  @ApiResponseCommon()
  @Get('more/call-external-api')
  callExternalApi() {
    return handleResponse(() => this.examplesService.callExternalApi())
  }

  @ApiOperation({ summary: 'Call an external API' })
  @ApiResponse({
    status: 200,
    description: 'Return the result'
  })
  @ApiResponseCommon()
  @Version('2')
  @Get('more/call-external-api')
  callExternalApiV2() {
    return handleResponse(() => this.examplesService.callExternalApiV2())
  }

  @ApiOperation({ summary: 'Send a mail' })
  @ApiResponse({
    status: 200,
    description: 'Return the result'
  })
  @ApiResponseCommon()
  @Post('more/send-mail')
  sendMail() {
    return handleResponse(() => this.examplesService.sendMail())
  }
}
