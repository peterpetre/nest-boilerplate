import { Global, Module, BadRequestException } from '@nestjs/common'
import { MulterModule as NestMulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import path from 'path'
import fs from 'fs'
import uuid from 'uuid'
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from './config.module'

@Global()
@Module({
  imports: [
    NestMulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        limits: {
          fileSize: configService.get('UPLOAD_MAX_FILESIZE')
        },
        fileFilter: (req: any, file: any, cb: any) => {
          if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf|json)$/)) {
            cb(null, true)
          } else {
            cb(
              new BadRequestException(
                `Unsupported file type ${path.extname(file.originalname)}`
              ),
              false
            )
          }
        },
        storage: diskStorage({
          destination: (req: any, file: any, cb: any) => {
            // NOTE: make the dirname plural based on the fieldname
            const dir = `${file.fieldname}${
              file.fieldname[file.fieldname.length - 1] === 's' ? '' : 's'
            }`
            const path = `./public/uploads/${dir}` // e.g. files, avatars, etc
            if (!fs.existsSync(path)) {
              fs.mkdirSync(path, { recursive: true })
            }
            cb(null, path)
          },
          filename: (req: any, file: any, cb: any) => {
            cb(null, `${uuid.v4()}${path.extname(file.originalname)}`)
          }
        })
      })
    })
  ],
  exports: [NestMulterModule]
})
export class MulterModule {}
