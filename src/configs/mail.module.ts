import { Injectable, Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import nodemailer from 'nodemailer'
import Email from 'email-templates'
import path from 'path'
// import pug from 'pug'
import { ConfigModule } from './config.module'

@Injectable()
export class MailService {
  private readonly mailFrom: string
  private readonly preview: false
  private readonly send: false
  private readonly smtpOptions: any

  constructor(private readonly configService: ConfigService) {
    this.mailFrom = configService.get('MAIL_FROM')
    this.preview = configService.get('IS_DEVELOPMENT')
    this.send =
      configService.get('IS_PRODUCTION') &&
      configService.get('SMTP_HOST') &&
      configService.get('SMTP_PORT') &&
      configService.get('SMTP_USER') &&
      configService.get('SMTP_PASS')
    this.smtpOptions = {
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASS')
      },
      debug: true,
      pool: true,
      maxConnections: 1
    }
  }

  createMail() {
    return new Email({
      transport: nodemailer.createTransport(this.smtpOptions),
      message: {
        from: this.mailFrom
      },
      views: {
        root: path.join(__dirname, '../../mail/templates')
      },
      juiceResources: {
        webResources: {
          relativeTo: path.join(__dirname, '../../mail/assets')
        }
      },
      i18n: {
        locales: ['en', 'de'],
        directory: path.join(__dirname, '../../mail/locales'),
        logger: false
      },
      preview: this.preview,
      send: this.send
    })
  }

  async sendMail(options: Email.EmailOptions<any>) {
    // NOTE: doesnt seem to do what it says it does, nothing is precached
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // console.log('pug cached files', Object.keys(pug.cache))
    return this.createMail().send(options)
  }
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
