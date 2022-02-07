import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody
} from '@nestjs/swagger'
import { ApiResponseCommon } from '@/decorators/api-response-common.decorator'
import { handleResponse } from '@/handlers/response.handler'
import { Required } from '@/decorators/required.decorator'
import { FilesService } from './files.service'
import { RenameFileDto } from './dto/rename-file.dto'
import { File } from './entities/file.entity'

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'The files have been successfully uploaded',
    type: [File]
  })
  @ApiResponseCommon()
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiple(
    @UploadedFiles()
    @Required('files')
    uploadFilesDto: Array<Express.Multer.File>
  ) {
    return handleResponse(() =>
      this.filesService.createMultiple(uploadFilesDto)
    )
  }

  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded',
    type: File
  })
  @ApiResponseCommon()
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(
    @UploadedFile() @Required('file') uploadFileDto: Express.Multer.File
  ) {
    return handleResponse(() => this.filesService.createSingle(uploadFileDto))
  }

  @ApiOperation({ summary: 'Get all files' })
  @ApiResponse({
    status: 200,
    description: 'Return all files',
    type: [File]
  })
  @ApiResponseCommon()
  @Get()
  findAll() {
    return handleResponse(() => this.filesService.findAll())
  }

  @ApiOperation({ summary: 'Get a file' })
  @ApiResponse({
    status: 200,
    description: 'Return the file',
    type: File
  })
  @ApiResponseCommon()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return handleResponse(() => this.filesService.findOne(id))
  }

  @ApiOperation({ summary: 'Rename a file' })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully renamed',
    type: File
  })
  @ApiResponseCommon()
  @Patch('rename/:id')
  rename(@Param('id') id: number, @Body() renameFileDto: RenameFileDto) {
    return handleResponse(() => this.filesService.rename(id, renameFileDto))
  }

  @ApiOperation({ summary: 'Remove a file' })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully removed',
    type: File
  })
  @ApiResponseCommon()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return handleResponse(() => this.filesService.remove(id))
  }
}
