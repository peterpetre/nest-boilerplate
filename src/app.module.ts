import { Module } from '@nestjs/common'
import { ConfigModule } from './configs/config.module'
// import { GraphQLModule } from './configs/graphql.module'
import { HttpModule } from './configs/http.module'
import { MailModule } from './configs/mail.module'
import { MikroOrmModule } from './configs/mikro-orm.module'
import { MulterModule } from './configs/multer.module'
import { PassportModule } from './configs/passport.module'
import { ThrottlerModule } from './configs/throttler.module'
import { UsersModule } from './modules/users/users.module'
import { FilesModule } from './modules/files/files.module'
import { ExamplesModule } from './modules/examples/examples.module'

@Module({
  imports: [
    ConfigModule,
    // GraphQLModule,
    HttpModule,
    MailModule,
    MikroOrmModule,
    MulterModule,
    PassportModule,
    ThrottlerModule,
    // NOTE: order matters for swagger
    UsersModule,
    FilesModule,
    ExamplesModule
  ]
})
export class AppModule {}
